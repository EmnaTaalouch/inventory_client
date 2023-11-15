import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/auth', 
  responseType: 'json',
});

export const AuthApi = {
  async login(body) {
    const { data } = await api.post('/', body);
    return data;
  },

  async test() {
    const { data } = await api.get('/');
    return data;
  },
};
