import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Signature from '../models/Signature';

// import Notification from '../schemas/Notification';

import CreateDeliveryService from '../services/CreateDeliveryService';
import CancelDeliveryService from '../services/CancelDeliveryService';

// import Queue from '../../lib/Queue';
// import Cache from '../../lib/Cache';

class DeliveryController {
  async store(req, res) {
    /*
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date().required(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    */

    // const date = new Date();
    // const dateStart = startOfHour(parseISO(date));

    const { product, recipient_id, deliveryman_id, signature_id } = req.body;

    /*
    const recipientExists = await Recipient.findOne({
      where: { id: recipient_id },
    });
    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });
    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const signatureExists = await Signature.findOne({
      where: { id: signature_id },
    });
    if (!signatureExists) {
      return res.status(400).json({ error: 'Signature does not exists' });
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
    } = await Deliveries.create(req.body);
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
    const { id } = await Delivery.create(req.body);

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
    });
    */
    const delivery = await CreateDeliveryService.run({
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
    });
    return res.json(delivery);
  }

  async update(req, res) {
    /*
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date().required(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    */
    /*
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

    const signatureExists = await Signature.findOne({
      where: { id: req.body.signature_id },
    });
    if (!signatureExists) {
      return res.status(400).json({ error: 'Signature does not exists' });
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
  }

  /*
  async index(req, res) {
    const deliverymandId = req.params.id;
    // const { deliveryProductName } = req.query;

    const delivery = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymandId,
        canceled_at: null,
        // : {
        //  [Op.iLike]: `%${deliveryProductName}%`,
        // },
      },
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
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
  */
  async index(req, res) {
    // const delivery_id = req.params.id;
    const { deliveryProductName } = req.query;

    const delivery = await Delivery.findAll({
      where: {
        // id: delivery_id,
        // deliveryman_id: deliverymandId,
        canceled_at: null,
        product: {
          [Op.iLike]: `%${deliveryProductName}%`,
        },
      },
      order: ['id'],
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'created_at',
        'status',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'email',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'avatar_id'],
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
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'created_at',
        'status',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'email',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'avatar_id'],
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
    const deliveryId = req.params.id;
    /*
    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    await delivery.destroy();

    return res.status(200).json({ success: 'Delivery deleted' });
    */
    const delivery = await CancelDeliveryService.run({
      deliveryId,
    });
    return res.json(delivery);
  }
}

export default new DeliveryController();
