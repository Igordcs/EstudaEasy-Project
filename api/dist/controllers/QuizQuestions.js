"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _QuizQuestion = require('../models/QuizQuestion'); var _QuizQuestion2 = _interopRequireDefault(_QuizQuestion);
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 const create = async (req, res) => {
  const {id: content_id, resume: resume_id, statement, alternatives} = req.body;

  if(!content_id || !statement || !alternatives) {
    return res.status(400).json({errors: 'Não foi possível a criação'})
  }

  try {
    const question = await _QuizQuestion2.default.create({content_id, resume_id, statement, alternatives})
    return res.status(200).json({question});
  } catch (error) {
    return res.status(400).json({errors: error})
  }

}; exports.create = create

 const startQuiz = async (req, res) => {
  if(!req.userId) {
    return res.status(400).json({errors: 'Houve um erro a inciar o quiz!'});
  }

  try {
    const questions = await _QuizQuestion2.default.findOne({ order: _sequelize2.default.literal('random()'), limit: 5 });
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(400).json(error);
  }


}; exports.startQuiz = startQuiz

