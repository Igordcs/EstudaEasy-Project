import ClassResume from "../models/ClassResume";

export const search = async (req, res) => {
  const {id: content_classes_id} = req.params;

  try {
    const resumes = await ClassResume.findAll({where: {content_classes_id}});
    return res.status(200).json(resumes);
  } catch (error) {
    return res.status(400).json({errors: error.e.message})
  }
}

export const index = async (req, res) => {
  const {id: resumeId} = req.params;

  if(!req.userId) {
    return res.status(401).json({error: 'Não é possível acessar essa página!'});
  }

  try {
    const resume = await ClassResume.findByPk(resumeId);
    return res.status(200).json(resume);
  } catch (error) {
    return res.status(400).json({errors: error.e.message});
  }

}

export const create = async (req, res) => {
  const {id: content_classes_id, name, sections} = req.body;

  if (!content_classes_id || !sections) {
    return res.status(400).json({errors: 'Informação enviada indevidamente!'});
  }

  try {
    const resume = await ClassResume.create({content_classes_id, name, sections});
    return res.status(200).json({resume});
  } catch (error) {
    return res.status(400).json({errors: error});
  }
}
