import axios from 'axios';

const API_URL = 'http://localhost:4008/api/users';

export const loginUser = async (credentials) => {
  const { data } = await axios.post(`${API_URL}/login`, credentials);
  return data.token;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post(`${API_URL}/register`, userData);
  return data.token;
};
