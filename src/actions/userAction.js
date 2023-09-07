import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:3000/user', responseType: 'json' });

export const UserApi = {
    async getAllUsers(body) {
      const { data } = await api.get('/', body);
      return data;
    },
    async getUserById(token) {
      const { data } = await api.get(`/${token}`);
      return data;
    },
    async createUser(body) {
      const { data } = await api.post(`/`, body);
      return data;
    },
    async updateUser(UserId, body) {
      const { data } = await api.put(`/${UserId}`, body);
      return data;
    },
    async deleteUser(UserId) {
      const { data } = await api.delete(`/${UserId}`);
      return data;
    },


    async findByEmail(email) { 
      const { data } = await api.get(`/email/${email}`); 
      return data;
    }
    

  };