import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      // start_date: Yup.date().required(),
      // end_date: Yup.date(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Validation fails' });
  }
};
