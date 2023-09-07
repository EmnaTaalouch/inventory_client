import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/cart', 
  responseType: 'json',
});

export const CartApi = {
  async addToCart(userId, createCartItemDto) {
    const { data } = await api.post(`/${userId}`, createCartItemDto);
    return data;
  },

  async getCartItems(userId) {
    const { data } = await api.get(`/${userId}`);
    return data;
  },

  async removeFromCart(userId, productId) {
    const { data } = await api.delete(`/${userId}/${productId}`);
    return data;
  },

  async updateCartItem(userId, productId, updateCartItemDto) {
    const { data } = await api.put(`/${userId}/${productId}`, updateCartItemDto);
    return data;
  },

  async getCartItemById(userId, productId) {
    const { data } = await api.get(`/${userId}/${productId}`);
    return data;
  },
};
