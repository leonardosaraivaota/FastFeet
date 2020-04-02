import {
  startOfDay,
  endOfDay,
  startOfHour,
  parseISO,
  isBefore,
  format,
} from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Signature from '../models/Signature';

// import Queue from '../../lib/Queue';

// import Notification from '../schemas/Notification';
// import NewDeliveryMail from '../jobs/NewDeliveryMail';

// import Cache from '../../lib/Cache';

class CreateDeliveryPickerService {
  async run({ delivery_id, deliveryman_id, recipient_id, dateStart }) {
    const delivery = await Delivery.findByPk(delivery_id);

    // const { date } = req.params;
    // const dateStart = startOfHour(parseISO(date));
    // const getStudents = async params => {
    // const deliveryCount = await Delivery.findAndCountAll({
    const deliveryCount = await Delivery.findAndCountAll({
      where: {
        deliveryman_id,
        // [Op.between]: [startOfDay(dateStart), endOfDay(dateStart)],
      },
      // distinct: true,
    });
    // };
    // const q = getStudents();
    // console.log(deliveryCount.count);
    if (deliveryCount.count > 5) {
      // return res.status(400).json({ error: 'You can only do 5 deliverys per day' });
      throw new Error('You can only do 5 deliveries per day');
    }

    const deliveryExists = await Delivery.findByPk(delivery_id);
    if (!deliveryExists) {
      // return res.status(400).json({ error: 'Delivery does not exists' });
      throw new Error('Delivery does not exists');
    }

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
    /*
    const delivery = await Delivery.findByIdAndUpdate(
      deliveryman_id,
      { read: true },
      { new: true }
    );
    */
    delivery.start_date = new Date();
    await delivery.save();

    return delivery;
  }
}

export default new CreateDeliveryPickerService();
