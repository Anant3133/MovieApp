import axios from 'axios';
import { getToken } from '../utils/token';

const axiosInstance = axios.create({
  baseURL: 'http://https://movieapp-u9ts.onrender.com/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
