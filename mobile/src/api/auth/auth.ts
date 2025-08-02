import api from '../api';

export const signIn = async (email: string, password: string) => {
  const newEmail = email.toLowerCase();
  try {
    const response = await api.post('/user/token', {email: newEmail, password});
    return response.data;
  } catch (error) {
    const errors = error.response.data.errors;
    return {errors}
  }

};

export const register = async (nome: string, email: string, password: string) => {
  const newEmail = email.toLowerCase();
  try {
    const response = await api.post('/user/create', {nome, email: newEmail, password, experience: 0, level: 0})
    return response.data;
  } catch (error) {
    const errors = error.response.data.errors;
    return {errors};
  }
}

export const addExpToUser = async (amount: number, level?: number) => {
  try {
    const response = await api.put('/user/update', {experience: amount, level: level});
    return response.data
  } catch (error) {
    const errors = error.response.data.errors;
    return {errors};
  }
}