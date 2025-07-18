import axiosInstance from './axiosInstance';

export const fetchRatingsForMovie = (movieId) => {
  return axiosInstance.get(`/ratings/movie/${movieId}`);
};

export const addOrUpdateRating = (movieId, rating) => {
  return axiosInstance.post('/ratings', { movieId, rating });
};
