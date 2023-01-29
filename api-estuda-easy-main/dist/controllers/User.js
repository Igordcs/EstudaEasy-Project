"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

 const create = async (req, res) => {
  try {
    const novoUser = await _User2.default.create(req.body);
    const { id, nome, email } = novoUser;
    return res.json({ id, nome, email });
  } catch (e) {
    return res.status(401).json({ errors: e });
  }
}; exports.create = create

 const update = async (req,res) => {
  try {
    const user = await _User2.default.findByPk(req.userId);

    if(!user) {
      return res.status(400).json({errors: 'Não foi possível achar seu usuário.'})
    }

    const novosDados = await user.update(req.body);

    const {id, nome, email} = novosDados;

    return res.status(200).json({ id, nome, email });
  } catch (e) {
    return res.status(401).json({ errors: e.errors });
  }
}; exports.update = update
