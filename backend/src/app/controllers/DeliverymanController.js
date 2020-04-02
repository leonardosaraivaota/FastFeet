// import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

// import Cache from '../../lib/Cache';

class DeliverymanController {
  async store(req, res) {
    /*
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    */

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    /*
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    */

    const { name, email } = req.body;
    const deliverymanId = req.params.id;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }

    await deliveryman.update(req.body);

    const { id, avatar } = Deliveryman.findByPk(deliverymanId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
  /*
  async index(req, res) {
    const { page = 1 } = req.query;

    //const cacheKey = `deliveryman:${deliverman}:`;
    //const cached = await Cache.get(cacheKey);

    //if (cached) {
    //  return res.json(cached);
    //}


    const deliverymans = await Deliveryman.findAll({
      order: ['name'],
      attributes: ['id', 'name', 'email'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    // await Cache.set(cacheKey, deliverymans);

    return res.json(deliverymans);
  }
  */

  async index(req, res) {
    const { page = 1, deliverymanName } = req.query;
    /*
    const cacheKey = `deliveryman:${deliverman}:`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }
    */

    const deliverymans = await Deliveryman.findAll({
      where: {
        name: {
          [Op.iLike]: `%${deliverymanName}%`,
        },
      },
      order: ['name'],
      attributes: ['id', 'name', 'email'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    // await Cache.set(cacheKey, deliverymans);

    return res.json(deliverymans);
  }

  async show(req, res) {
    const deliveryman_id = req.params.id;
    const { page = 1 } = req.query;
    /*
    const cacheKey = `deliveryman:${deliverman}:`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }
    */

    const deliverymans = await Deliveryman.findAll({
      where: { id: deliveryman_id },
      order: ['name'],
      attributes: ['id', 'name', 'email'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    // await Cache.set(cacheKey, deliverymans);

    return res.json(deliverymans);
  }

  async delete(req, res) {
    const deliverymanId = req.params.id;
    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    await deliveryman.destroy();

    return res.status(200).json({ message: 'Delyveryman succesfull deleted' });
  }
}

export default new DeliverymanController();
