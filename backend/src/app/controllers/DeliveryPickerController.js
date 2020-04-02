import * as Yup from 'yup';

import {
  startOfDay,
  endOfDay,
  startOfHour,
  parseISO,
  isBefore,
  format,
  subHours,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';

import DeliveryPicker from '../models/DeliveryPicker';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Signature from '../models/Signature';

import CreateDeliveryPickerService from '../services/CreateDeliveryPickerService';
import UpdateDeliveryPickerService from '../services/UpdateDeliveryPickerServices';
import CancelDeliveryPickerService from '../services/CancelDeliveryPickerService';

// import Cache from '../../lib/Cache';

class DeliveryPickerController {
  async store(req, res) {
    /*
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      start_date: Yup.date().required(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    */

    // const deliveryId = req.params.id;
    // const deliverymanId = req.params.deliveryman_id;
    // const { date } = req.params;

    const { delivery_id, deliveryman_id, recipient_id, start_date } = req.body;
    const dateStart = startOfHour(parseISO(start_date));

    /*
    const deliveryCount = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: deliverymanId,
        [Op.between]: [startOfDay(dateStart), endOfDay(dateStart)],
      },
      distinct: true,
    });

    if (deliveryCount > 5) {
      return res
        .status(400)
        .json({ error: 'You can only do 5 deliverys per day' });
    }

    const deliveryExists = await Delivery.findByPk(deliveryId);
    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const recipientExists = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });
    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { id: req.body.deliveryman_id },
    });
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }
    */

    /*
    const {
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = await Delivery.create(req.body);

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    });
    */
    /*
    const delivery = await Delivery.findByIdAndUpdate(
      deliveryman_id,
      { read: true },
      { new: true }
    );

    return res.json(notitication);
    */

    const delivery = await CreateDeliveryPickerService.run({
      delivery_id,
      deliveryman_id,
      recipient_id,
      dateStart,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    /*
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      start_date: Yup.date().required(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    */
    /*
    const delivery = req.params.id;

    const {
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = req.body;

    const deliveriesId = req.params.id;

    const deliveries = await Delivery.findByPk(deliveriesId);

    const recipientExists = await Recipient.findOne({
      where: { id: req.body.recipient_id },
    });
    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { id: req.body.deliveryman_id },
    });
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    await deliveries.update(req.body);

    const { id, recipient, deliveryman, signature } = Delivery.findByPk(
      deliveriesId,
      {
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
      }
    );

    return res.json({
      id,
      recipient,
      deliveryman,
      signature,
      product,
      canceled_at,
      start_date,
      end_date,
    });
    */
    // const delivery_id = req.params.id;

    const {
      delivery_id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      end_date,
    } = req.body;

    const dateEnd = startOfHour(parseISO(end_date));

    const delivery = await UpdateDeliveryPickerService.run({
      delivery_id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      dateEnd,
    });

    return res.json(delivery);
  }

  async index(req, res) {
    const deliverymandId = req.params.id;
    // const { deliveryProductName } = req.query;

    const delivery = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymandId,
        start_date: null,
        canceled_at: null,
        // product: {
        //  [Op.iLike]: `%${deliveryProductName}%`,
        // },
      },
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'start_date',
        'end_date',
        'product',
      ],
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
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    // await Cache.set('delivery', delivery);

    return res.json(delivery);
  }

  async show(req, res) {
    const deliverymandId = req.params.id;
    // const { deliveryProductName } = req.query;

    const delivery = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymandId,
        end_date: {
          [Op.ne]: null,
        },
        // product: {
        //  [Op.iLike]: `%${deliveryProductName}%`,
        // },
      },
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'start_date',
        'end_date',
        'product',
      ],
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
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    // await Cache.set('delivery', delivery);

    return res.json(delivery);
  }

  async delete(req, res) {
    const delivery_id = req.params.id;

    const delivery = await CancelDeliveryPickerService.run({
      delivery_id,
    });
    return res.json(delivery);
  }
}

export default new DeliveryPickerController();
