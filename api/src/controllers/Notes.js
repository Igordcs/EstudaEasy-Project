import Notes from '../models/Notes';

export const index = async (req, res) => {
  const user_id = req.userId;

  if(!user_id) {
    return res.status(401).json({error: 'Acesso não autorizado!'});
  }

  try {
    const notes = await Notes.findAll({where: {user_id}})
    return res.status(200).json({notes});
  } catch (error) {
    return res.status(400).json({errors: error.message});
  }
}

export const create = async (req, res) => {
  const {text, answer, color} = req.body;
  const user_id = req.userId;

  if(!user_id) {
    return res.status(401).json({error: 'Acesso não autorizado!'});
  }

  try {
    const note = await Notes.create({text, answer, color, user_id})
    return res.status(200).json({note});
  } catch (error) {
    return res.status(400).json({errors: error.message})
  }
}
