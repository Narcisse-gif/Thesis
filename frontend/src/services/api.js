import axios from 'axios';
import { getToken } from '../utils/authStorage';

const isProduction = import.meta.env.PROD;
const apiUrl = import.meta.env.VITE_API_URL;

if (isProduction && !apiUrl) {
  throw new Error('VITE_API_URL is required in production');
}

const baseURL = apiUrl || 'http://localhost:8081';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête si l'utilisateur est connecté
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
