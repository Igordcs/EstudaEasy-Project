import api from "../api";

export const getClasses = async (id: number) => {
    console.log('ID DESSA PORRA',id)
    const response = await api.get(`/contentClasses/index/${id}`);
    return response.data;
}

export const getClassResume = async (id: number) => {
    const response = await api.get(`/resume/view/${id}`);
    console.log(response.statusText);
    return response.data;
}