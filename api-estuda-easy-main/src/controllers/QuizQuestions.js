import QuizQuestion from '../models/QuizQuestion';
import Sequelize from 'sequelize';

export const create = async (req, res) => {
  const {id: content_id, resume: resume_id, statement, alternatives} = req.body;

  if(!content_id || !statement || !alternatives) {
    return res.status(400).json({errors: 'Não foi possível a criação'})
  }

  try {
    const question = await QuizQuestion.create({content_id, resume_id, statement, alternatives})
    return res.status(200).json({question});
  } catch (error) {
    return res.status(400).json({errors: error})
  }

}

export const startQuiz = async (req, res) => {
  if(!req.userId) {
    return res.status(400).json({errors: 'Houve um erro a inciar o quiz!'});
  }

  try {
    const questions = await QuizQuestion.findOne({ order: Sequelize.literal('random()'), limit: 5 });
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(400).json(error);
  }


}

