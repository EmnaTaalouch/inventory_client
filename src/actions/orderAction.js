import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/orders', 
  responseType: 'json',
});

export const OrderApi = {
  async getAllOrders() {
    const { data } = await api.get('/');
    return data;
  },

  async getOrderById(orderId) {
    const { data } = await api.get(`/${orderId}`);
    return data;
  },

  async createOrder(createOrderDto) {
    const { data } = await api.post('/', createOrderDto);
    return data;
  },

  async updateOrder(orderId, updateOrderDto) {
    const { data } = await api.put(`/${orderId}`, updateOrderDto);
    return data;
  },

  async deleteOrder(orderId) {
    const { data } = await api.delete(`/${orderId}`);
    return data;
  },
};
