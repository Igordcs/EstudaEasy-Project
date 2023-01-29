import api from "../api"

export const getQuestion = async () => {
    const response = await api.get(`/quizquestion/quiz`)
    return response.data;
}

export const getAllContents = async () => {
    const response = await api.get('/quizcontent/index');
    const {contents} = response.data
    return contents;
}