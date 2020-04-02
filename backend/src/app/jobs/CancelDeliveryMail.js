import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancelDeliveryMail {
  get key() {
    return 'CancelDeliveryMail';
  }

  async handle({ data }) {
    // const { appointment, teste } = data;
    const { delivery } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Cancelamento de encomenda',
      // text: 'Você tem um novo cancelamento',
      template: 'newDelivery',
      context: {
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        date: format(
          parseISO(delivery.start_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelDeliveryMail();
