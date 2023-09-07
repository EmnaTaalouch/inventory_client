import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/products', 
  responseType: 'json',
});

export const ProductApi = {
  async getAllProducts() {
    const { data } = await api.get('/');
    return data;
  },

  async getProductById(productId) {
    const { data } = await api.get(`/${productId}`);
    return data;
  },

  async createProduct(createProductDto) {
    const { data } = await api.post('/', createProductDto);
    return data;
  },

  async updateProduct(productId, updateProductDto) {
    const { data } = await api.put(`/${productId}`, updateProductDto);
    return data;
  },

  async deleteProduct(productId) {
    const { data } = await api.delete(`/${productId}`);
    return data;
  },
};
