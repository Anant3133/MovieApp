import axiosInstance from './axiosInstance';

export const searchMovies = async (query, filters = {}) => {
  const params = { q: query, ...filters };
  const response = await axiosInstance.get('/search', { params });
  return response.data; 
};
