"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _QuizContent = require('../models/QuizContent'); var _QuizContent2 = _interopRequireDefault(_QuizContent);

 const index = async (req, res) => {
  try {
    const contents = await _QuizContent2.default.findAll()
    return res.status(200).json({contents});
  } catch (error) {
    return res.status(400).json({errors: 'Não foi possível achar esse conteúdo'})
  }
}; exports.index = index
 const create = async (req,res) => {
  const {name, type} = req.body;

  if(!name || !type) {
    return res.status(400).json({errors: 'Não foi possível adicionar esse conteúdo'});
  }
  try {
    const content = await _QuizContent2.default.create({content_name: name, content_type: type})
    return res.status(200).json({content})

  } catch (error) {
    return res.status(400).json({error})
  }

}; exports.create = create
