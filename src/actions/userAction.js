import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:5000/user', responseType: 'json' });

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
    async updateUser(id, body) {
        const { data } = await api.put(`/${id}`, body);
        return data;
    },
    async deleteUser(id) {
        const { data } = await api.delete(`/${id}`);
        return data;
    },

    async findByEmail(email) {
        const { data } = await api.get(`/email/${email}`);
        return data;
    },
};
