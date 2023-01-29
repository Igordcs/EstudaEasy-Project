import ContentClasses from "../models/ContentClasses";
import ClassResume from '../models/ClassResume';

export const index = async (req, res) => {
  const {id: content_teach_id} = req.params;

  if(!req.userId) {
    return res.status(401).json({error: 'Não é possível acessar essa página!'});
  }

  try {
    const classes = await ContentClasses.findAll({where: {content_teach_id}, include: {model: ClassResume, attributes: ['id', 'name']}});
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(400).json({errors: error.message});
  }

}

export const search = async (req, res) => {
  const {id: content_teach_id} = req.params

  try {
    const classes = await ContentClasses.findAll({where: {content_teach_id}});
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(400).json({errors: error.message});
  }

}

export const create = async (req, res) => {
  const {id: content_teach_id, name} = req.body;

  if (!content_teach_id || !name) {
    return res.status(400).json({errors: 'Informação enviada indevidamente!'});
  }

  try {
    const contentClass = await ContentClasses.create({content_teach_id, name});
    return res.status(200).json({contentClass});
  } catch (error) {
    return res.status(400).json({errors: error.message});
  }
}
