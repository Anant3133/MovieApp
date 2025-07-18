import api from './axiosInstance';

const BASE_URL = '/hero';

export const fetchHeroCarousel = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

export const fetchHeroById = async (id) => {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const addHeroMovie = async (movieData) => {
  const response = await api.post(BASE_URL, movieData);
  return response.data;
};

export const updateHeroMovie = async (id, updatedData) => {
  const response = await api.put(`${BASE_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteHeroMovie = async (id) => {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
};
