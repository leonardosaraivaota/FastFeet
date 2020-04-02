// import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
// import User from '../models/User';
// import File from '../models/File';

// import Cache from '../../lib/Cache';

class RecipientController {
  async store(req, res) {
    /*
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      street: Yup.string().required(),
      number: Yup.integer().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    */

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists;' });
    }

    // const user = await User.create(req.body);
    // return res.json(user);

    /*
    const { id, name, email, provider } = await User.create(req.body);

    if (provider) {
      await Cache.invalidate('providers');
    }

    return res.json({
      id,
      name,
      email,
      provider,
    });
    */

    const {
      id,
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    /*
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      street: Yup.string().required(),
      number: Yup.integer().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });
    */
    // console.log(req.userId);
    const recipientId = req.params.id;
    // const { name, email, street, number, complement, state, city, zip_code } = req.body;

    const recipient = await Recipient.findByPk(recipientId);
    /*
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists;' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    */

    // const { id, name, provider } = await user.update(req.body);
    await recipient.update(req.body);

    const {
      id,
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.findByPk(recipientId);

    return res.json({
      id,
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  /*
  async index(req, res) {
    const { page = 1 } = req.query;

    //const cacheKey = `recipients:${recipient}`;
    //const cached = await Cache.get(cacheKey);

    //if (cached) {
    //  return res.json(cached);
    //}

    const recipients = await Recipient.findAll({
      order: ['name'],
      attributes: ['id', 'name'],
      limit: 20,
      offset: (page - 1) * 20,
      //include: [
      //  {
      //    model: File,
      //    as: 'avatar',
      //    attributes: ['id', 'path', 'url'],
      //  },
      //],
    });

    return res.json(recipients);
  }
  */
  async index(req, res) {
    const { page = 1, recipientName } = req.query;
    /*
    const cacheKey = `recipients:${recipient}`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }
    */
    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `%${recipientName}%`,
        },
      },
      order: ['name'],
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'city',
        'state',
        'zip_code',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      /*
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
      */
    });

    return res.json(recipients);
  }

  async delete(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new RecipientController();
