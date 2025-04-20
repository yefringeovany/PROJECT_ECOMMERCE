import api from './axiosConfig';

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await api.get('/products/featured');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};