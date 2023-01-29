import axios from 'axios';

const api = axios.create({
  baseURL: 'https://estuda-easy.herokuapp.com',
});

export default api;
