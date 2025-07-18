require('dotenv').config();
const axios = require('axios');
const sequelize = require('../database');
const Movie = require('../models/Movie');

const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function fetchGenresMap() {
  try {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`;
    const response = await axios.get(url);
    
    const map = {};
    response.data.genres.forEach(g => {
      map[g.id] = g.name;
    });
    return map;
  } catch {
    return {};
  }
}

async function fetchCast(movieId) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`;
    const response = await axios.get(url);

    const cast = response.data.cast
      .slice(0, 5)
      .map(c => c.name)
      .join(', ');
    return cast;
  } catch {
    return '';
  }
}

async function fetchDetails(movieId) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos`;
    const response = await axios.get(url);

    const videos = response.data.videos.results;
    let trailerUrl = '';
    if (videos && videos.length) {
      const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
      if (trailer) {
        trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
      }
    }

    return {
      length: response.data.runtime ? `${response.data.runtime} min` : null,
      trailerUrl,
    };
  } catch {
    return { length: null, trailerUrl: '' };
  }
}

async function fetchPopularMovies(page = 1) {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
    const response = await axios.get(url);
    return response.data.results;
  } catch (err) {
    console.error('TMDB fetch error:', err.message);
    return [];
  }
}

async function syncMovies() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    const genresMap = await fetchGenresMap();
    const movies = await fetchPopularMovies();

    for (const tmdbMovie of movies) {
      const title = tmdbMovie.title;
      const releaseYear = tmdbMovie.release_date ? parseInt(tmdbMovie.release_date.slice(0, 4)) : null;

      const genreNames = (tmdbMovie.genre_ids || []).map(id => genresMap[id]).filter(Boolean).join(', ');

      const cast = await fetchCast(tmdbMovie.id);
      const details = await fetchDetails(tmdbMovie.id);

      const posterUrl = tmdbMovie.poster_path
        ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
        : null;

      const movie = await Movie.findOne({ where: { title, releaseYear } });

      if (movie) {
        await movie.update({
          synopsis: tmdbMovie.overview,
          posterUrl,
          genre: genreNames,
          length: details.length,
          cast,
          trailerUrl: details.trailerUrl,
          rating: tmdbMovie.vote_average || 0,
        });
        console.log(`Updated movie: ${title}`);
      } else {
        await Movie.create({
          title,
          synopsis: tmdbMovie.overview,
          posterUrl,
          genre: genreNames,
          length: details.length,
          cast,
          releaseYear,
          trailerUrl: details.trailerUrl,
          rating: tmdbMovie.vote_average || 0,
        });
        console.log(`Added movie: ${title}`);
      }
    }

    console.log('TMDB movies synced successfully');
    process.exit(0);
  } catch (err) {
    console.error('Sync failed:', err);
    process.exit(1);
  }
}

syncMovies();
