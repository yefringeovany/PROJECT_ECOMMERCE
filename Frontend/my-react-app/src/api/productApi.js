import axios from 'axios';

const API_URL = 'http://localhost:4008/api/products'; // Asegúrate de que esta URL sea la correcta

// Función para obtener productos desde la API
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Products fetched:', response.data);  // Verifica lo que se recibe
    return response.data; // Devuelve los datos obtenidos
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;  // Lanza el error para que sea manejado en otro lugar
  }
};
