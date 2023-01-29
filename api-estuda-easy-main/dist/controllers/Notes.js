"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Notes = require('../models/Notes'); var _Notes2 = _interopRequireDefault(_Notes);

 const index = async (req, res) => {
  const user_id = req.userId;

  if(!user_id) {
    return res.status(401).json({error: 'Acesso não autorizado!'});
  }

  try {
    const notes = await _Notes2.default.findAll({where: {user_id}})
    return res.status(200).json({notes});
  } catch (error) {
    return res.status(400).json({errors: error.message});
  }
}; exports.index = index

 const create = async (req, res) => {
  const {text, answer, color} = req.body;
  const user_id = req.userId;

  if(!user_id) {
    return res.status(401).json({error: 'Acesso não autorizado!'});
  }

  try {
    const note = await _Notes2.default.create({text, answer, color, user_id})
    return res.status(200).json({note});
  } catch (error) {
    return res.status(400).json({errors: error.message})
  }
}; exports.create = create
