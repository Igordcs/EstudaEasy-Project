import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

export const index = (req, res) => {
  return upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }

    try {
      const { originalname, filename } = req.file;
      // eslint-disable-next-line camelcase
      const { user_id } = req.body;
      const foto = await Foto.create({ originalname, filename, user_id });

      return res.json(foto);
    } catch (e) {
      return res.status(404).json({ errors: ['Usuário não existe'] });
    }
  });
}
