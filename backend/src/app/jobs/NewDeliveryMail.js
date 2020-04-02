import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    // const { appointment, teste } = data;
    const { delivery } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Nova encomenda cadastrada',
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

export default new NewDeliveryMail();
