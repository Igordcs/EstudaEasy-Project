import QuizContent from "../models/QuizContent";

export const index = async (req, res) => {
  try {
    const contents = await QuizContent.findAll()
    return res.status(200).json({contents});
  } catch (error) {
    return res.status(400).json({errors: 'Não foi possível achar esse conteúdo'})
  }
}
export const create = async (req,res) => {
  const {name, type} = req.body;

  if(!name || !type) {
    return res.status(400).json({errors: 'Não foi possível adicionar esse conteúdo'});
  }
  try {
    const content = await QuizContent.create({content_name: name, content_type: type})
    return res.status(200).json({content})

  } catch (error) {
    return res.status(400).json({error})
  }

}
