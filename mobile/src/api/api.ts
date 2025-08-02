import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://estuda-easy.herokuapp.com',
});

export default api;
