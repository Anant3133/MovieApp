import axiosInstance from './axiosInstance';

export const fetchAllMovies = () => {
  return axiosInstance.get('/movies');
};

export const fetchMovieById = (id) => {
  return axiosInstance.get(`/movies/${id}`);
};

export const searchMovies = (query) => {
  return axiosInstance.get(`/search?query=${encodeURIComponent(query)}`);
};

export const createMovie = async (movieData) => {
  const res = await axiosInstance.post('/movies', movieData);
  return res.data;
};

export async function fetchFeaturedMovies() {
  const response = await axiosInstance.get('/movies/featured');
  return response.data; 
}

export async function fetchMovies() {
  const response = await axiosInstance.get('/movies');
  return response.data; 
}

export const filterMovies = async (genre = '', query = '') => {
  const params = {};
  if (genre) params.genre = genre;
  if (query) params.q = query;

  const response = await axiosInstance.get('/movies/filter', { params });
  return response.data;  
};
