import axiosInstance from './axiosInstance';

const TMDB_API_KEY = 'e7ad15bc828b2dbba27a54b535057e27'; 

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axiosInstance.get('/movie/popular', {
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching popular movies from TMDB:', error);
    throw error;
  }
};

