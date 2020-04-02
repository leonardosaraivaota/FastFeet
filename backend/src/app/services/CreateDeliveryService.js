import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Signature from '../models/Signature';

// import Queue from '../../lib/Queue';

// import Notification from '../schemas/Notification';
import NewDeliveryMail from '../jobs/NewDeliveryMail';

// import Cache from '../../lib/Cache';

class CreateDeliveryService {
  async run({ product, recipient_id, deliveryman_id, signature_id }) {
    const recipientExists = await Recipient.findOne({
      where: { id: recipient_id },
    });
    if (!recipientExists) {
      // return res.status(400).json({ error: 'Recipient does not exists' });
      throw new Error('Recipient does not exists');
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });
    if (!deliverymanExists) {
      // return res.status(400).json({ error: 'Deliveryman does not exists' });
      throw new Error('Deliveryman does not exists');
    }
    /*
    const signatureExists = await Signature.findOne({
      where: { id: signature_id },
    });
    if (!signatureExists) {
      // return res.status(400).json({ error: 'Signature does not exists' });
      throw new Error('Signature does not exists');
    }
    */

    const delivery = await Delivery.create({
      product,
      recipient_id,
      deliveryman_id,
      // signature_id
    });

    /*
    await Notification.create({
      content: `Nova encomenda de um ${product} para o entregador ${deliveryman_id}`,
      user: deliveryman_Id,
    });
    */
    /*
    await Queue.add(NewDeliveryMail.key, {
      delivery,
    });
    */
    /**
     * Invalidate Cache
     */
    // await Cache.invalidatePrefix(`delivery:${deliveryman_id}:newdelivery`);

    return delivery;
  }
}

export default new CreateDeliveryService();
