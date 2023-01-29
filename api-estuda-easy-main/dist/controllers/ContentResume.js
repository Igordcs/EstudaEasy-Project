"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ClassResume = require('../models/ClassResume'); var _ClassResume2 = _interopRequireDefault(_ClassResume);

 const search = async (req, res) => {
  const {id: content_classes_id} = req.params;

  try {
    const resumes = await _ClassResume2.default.findAll({where: {content_classes_id}});
    return res.status(200).json(resumes);
  } catch (error) {
    return res.status(400).json({errors: error.e.message})
  }
}; exports.search = search

 const index = async (req, res) => {
  const {id: resumeId} = req.params;

  if(!req.userId) {
    return res.status(401).json({error: 'Não é possível acessar essa página!'});
  }

  try {
    const resume = await _ClassResume2.default.findByPk(resumeId);
    return res.status(200).json(resume);
  } catch (error) {
    return res.status(400).json({errors: error.e.message});
  }

}; exports.index = index

 const create = async (req, res) => {
  const {id: content_classes_id, name, sections} = req.body;

  if (!content_classes_id || !sections) {
    return res.status(400).json({errors: 'Informação enviada indevidamente!'});
  }

  try {
    const resume = await _ClassResume2.default.create({content_classes_id, name, sections});
    return res.status(200).json({resume});
  } catch (error) {
    return res.status(400).json({errors: error.e.message});
  }
}; exports.create = create
