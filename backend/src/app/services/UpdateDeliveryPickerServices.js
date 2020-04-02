import { isBefore, subHours } from 'date-fns';

// import User from '../models/User';
// import Appointment from '../models/Appointment';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Signature from '../models/Signature';

// import Queue from '../../lib/Queue';

// import CancelDeliveryMail from '../jobs/CancelDeliveryMail';

// import Cache from '../../lib/Cache';

class UpdateDeliveryPickerService {
  async run({
    delivery_id,
    recipient_id,
    deliveryman_id,
    signature_id,
    product,
    end_date,
  }) {
    /*
    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      // eturn res.status(400).json({ error: 'Delivery does not exists' });
      throw new Error('Delivery does not exists');
    }

    delivery.end_date = new Date();

    await delivery.save();
    */

    /*
    await Queue.add(CancelDeliveryMail.key, {
      delivery,
    });
    */
    /**
     * Invalidate Cache
     */
    /*
    await Cache.invalidatePrefix(
      `delivery:${delivery.deliveryman_id}:canceldelivery`
    );
    */

    // const deliveries = await Delivery.findByPk(delivery_id);

    const recipientExists = await Recipient.findOne({
      // where: { id: req.body.recipient_id },
      where: { id: recipient_id },
    });
    if (!recipientExists) {
      // return res.status(400).json({ error: 'Recipient does not exists' });
      throw new Error('Recipient does not exists');
    }

    const deliverymanExists = await Deliveryman.findOne({
      // where: { id: req.body.deliveryman_id },
      where: { id: deliveryman_id },
    });
    if (!deliverymanExists) {
      // return res.status(400).json({ error: 'Deliveryman does not exists' });
      throw new Error('Deliveryman does not exists');
    }

    const signatureExists = await Signature.findOne({
      // where: { id: req.body.deliveryman_id },
      where: { id: signature_id },
    });
    if (!signatureExists) {
      // return res.status(400).json({ error: 'Deliveryman does not exists' });
      throw new Error('Signature does not exists');
    }
    /*
    const delivery = Delivery.findByPk(delivery_id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
        {
          model: Signature,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    */
    const delivery = await Delivery.findByPk(delivery_id);
    /*
    await delivery.update({
      delivery_id,
      recipient_id,
      deliveryman_id,
      signature_id,
      end_date,
    });
    */

    delivery.signature_id = signature_id;
    delivery.end_date = new Date();

    await delivery.save();

    return delivery;
  }
}

export default new UpdateDeliveryPickerService();
