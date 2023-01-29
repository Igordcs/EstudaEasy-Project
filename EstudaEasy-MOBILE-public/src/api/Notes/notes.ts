import api from "../api"

export const createNote = async (text: string, answer: string, color: string) => {
    try {
        const note = await api.post('/user/notes', {text, answer, color})
        return note;
    } catch (error) {
        console.log(error.message);
    }
}

export const getNotes = async () => {
    try {
        const notes = await api.get('/user/notes');
        return notes.data;
    } catch (error) {
        console.log(error.message);
    }
}