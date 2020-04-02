import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
// import Cache from '../../lib/Cache';

class DeliveryProblemController {
  async store(req, res) {
    /*
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    */

    // const deliveryId = req.body.delivery_id;
    const { delivery_id, description } = req.body;

    /*
    const deliveryProblemExists = await DeliveryProblem.findOne({
      where: { delivery_id: deliveryId },
    });

    if (deliveryProblemExists) {
      return res.status(400).json({ error: 'Delivery problem already exists' });
    }
    */

    // const { id } = DeliveryProblem.create({ delivery_id, description });
    // return res.json({ id, delivery_id, description });

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async update(req, res) {
    const deliveryProblem_id = req.params.id;
    const deliveryProblem = await DeliveryProblem.findByPk(deliveryProblem_id);
    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Delivery Problem not found' });
    }

    await deliveryProblem.update(req.body);

    return res.json(deliveryProblem);
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    /*
    const cacheKey = `user:${req.userId}:appointments:${page}`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }
    */
    const deliveryProblems = await DeliveryProblem.findAll({
      // where: { delivery_id: req.userId, canceled_at: null },
      order: ['created_at'],
      attributes: ['id', 'delivery_id', 'description'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    // await Cache.set(cacheKey, appointments);

    return res.json(deliveryProblems);
  }

  async delete(req, res) {
    const deliveryProblem_id = req.params.id;

    const deliveryProblem = await DeliveryProblem.findByPk(deliveryProblem_id);
    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Delivery Problem not found' });
    }

    await deliveryProblem.destroy(deliveryProblem_id);

    return res.json(deliveryProblem);
  }

  async show(req, res) {
    const { page = 1 } = req.query;
    const delivery_id = req.params.id;
    /*
    const cacheKey = `user:${req.userId}:appointments:${page}`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }
    */
    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id },
      order: ['created_at'],
      attributes: ['id', 'delivery_id', 'description','created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    // await Cache.set(cacheKey, appointments);

    return res.json(deliveryProblems);
  }
}

export default new DeliveryProblemController();
