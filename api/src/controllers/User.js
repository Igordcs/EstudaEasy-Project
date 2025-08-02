import User from "../models/User";

export const create = async (req, res) => {
  try {
    const novoUser = await User.create(req.body);
    const { id, nome, email } = novoUser;
    return res.json({ id, nome, email });
  } catch (e) {
    return res.status(401).json({errors: ['Credenciais inválidas']});
  }
}

export const update = async (req,res) => {
  try {
    const user = await User.findByPk(req.userId);
    if(!user) {
      return res.status(400).json({errors: 'Não foi possível achar seu usuário.'})
    }


    const novosDados = await user.update(req.body);

    const {id, nome, email, experience, level} = novosDados;

    return res.status(200).json({ id, nome, email, experience, level });
  } catch (e) {
    return res.status(401).json({ errors: e.errors });
  }
}

export const getUser = async (req, res) => {
  try {
    if(!req.userId)
       return res.status(400).json({errors: 'Não foi possível achar seu usuário.'});

    const usuario = await User.findByPk(req.userId);
    const {id, experience, level} = usuario;
    return res.status(200).json({id, experience, level});
  } catch (error) {
    return res.status(401).json({ errors: error.errors });
  }
}
