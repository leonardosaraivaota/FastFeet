import { isBefore, subHours } from 'date-fns';

// import User from '../models/User';
// import Appointment from '../models/Appointment';
import Delivery from '../models/Delivery';

// import Queue from '../../lib/Queue';

import CancelDeliveryMail from '../jobs/CancelDeliveryMail';

// import Cache from '../../lib/Cache';

class CancelDeliveryService {
  async run({ delivery_id }) {
    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      // eturn res.status(400).json({ error: 'Delivery does not exists' });
      throw new Error('Delivery does not exists');
    }

    delivery.canceled_at = new Date();

    await delivery.save();
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
    return delivery;
  }
}

export default new CancelDeliveryService();
