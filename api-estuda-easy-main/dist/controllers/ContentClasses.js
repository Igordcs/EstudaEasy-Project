"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ContentClasses = require('../models/ContentClasses'); var _ContentClasses2 = _interopRequireDefault(_ContentClasses);
var _ClassResume = require('../models/ClassResume'); var _ClassResume2 = _interopRequireDefault(_ClassResume);

 const index = async (req, res) => {
  const {id: content_teach_id} = req.params;

  if(!req.userId) {
    return res.status(401).json({error: 'Não é possível acessar essa página!'});
  }

  try {
    const classes = await _ContentClasses2.default.findAll({where: {content_teach_id}, include: {model: _ClassResume2.default, attributes: ['id', 'name']}});
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(400).json({errors: error.message});
  }

}; exports.index = index

 const search = async (req, res) => {
  const {id: content_teach_id} = req.params

  try {
    const classes = await _ContentClasses2.default.findAll({where: {content_teach_id}});
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(400).json({errors: error.message});
  }

}; exports.search = search

 const create = async (req, res) => {
  const {id: content_teach_id, name} = req.body;

  if (!content_teach_id || !name) {
    return res.status(400).json({errors: 'Informação enviada indevidamente!'});
  }

  try {
    const contentClass = await _ContentClasses2.default.create({content_teach_id, name});
    return res.status(200).json({contentClass});
  } catch (error) {
    return res.status(400).json({errors: error.message});
  }
}; exports.create = create
