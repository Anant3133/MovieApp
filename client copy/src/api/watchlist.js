import axiosInstance from './axiosInstance';

export const fetchWatchlist = () => {
  return axiosInstance.get('/watchlist');
};

export const addToWatchlist = (movieId) => {
  return axiosInstance.post('/watchlist', { movieId });
};

export const removeFromWatchlist = (movieId) => {
  return axiosInstance.delete(`/watchlist/${movieId}`);
};
