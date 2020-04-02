// import * as Yup from 'yup';

import Signature from '../models/Signature';

// import Cache from '../../lib/Cache';

class SignatureController {
  async store(req, res) {
    // return res.json({ ok: true });
    const { originalname: name, filename: path } = req.file;

    const signature = await Signature.create({
      name,
      path,
    });

    return res.json(signature);
  }
}

export default new SignatureController();
