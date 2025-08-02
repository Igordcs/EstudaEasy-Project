import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  // auth == bearer TOKEN
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ['Login required'] });
  }

  // auth == bearer TOKEN, so if i split this string, i'll recieve the token and the type of auth
  const [, ] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      res.status(401).json({ errors: ['Token inválido'] });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(401).json({ errors: ['Token inválido'] });
  }
};
