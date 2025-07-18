const Movie = require('../models/Movie');
const { Op } = require('sequelize');

exports.getAllMovies = async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
};

exports.getMovieById = async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
};

exports.createMovie = async (req, res) => {
  try {
    const {
      title,
      synopsis,
      posterUrl,
      genre,
      releaseYear,
      trailerUrl,
      rating,
      genreId
    } = req.body;

    const movie = await Movie.create({
      title,
      synopsis,
      posterUrl,
      genre,
      releaseYear,
      trailerUrl,
      rating,
      genreId
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error('Error creating movie:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateMovie = async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });

  await movie.update(req.body);
  res.json(movie);
};

exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });

  await movie.destroy();
  res.json({ message: 'Movie deleted' });
};

// ✅ New: Featured movies logic (e.g. top-rated)
exports.getFeaturedMovies = async (req, res) => {
  try {
    const featuredMovies = await Movie.findAll({
      where: {
        rating: {
          [Op.gte]: 4.5
        }
      },
      order: [['rating', 'DESC']],
      limit: 10
    });

    res.json(featuredMovies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching featured movies' });
  }
};

exports.filterMovies = async (req, res) => {
  const { genre, q } = req.query;  // q for optional search query/title
  const filters = {};

  if (genre && genre !== '') {
    filters.genre = genre; // assuming genre is a string column, or genreId if numeric
  }

  if (q && q !== '') {
    filters.title = { [Op.iLike]: `%${q}%` }; // case-insensitive like
  }

  try {
    const movies = await Movie.findAll({
      where: filters,
    });
    res.json(movies);
  } catch (error) {
    console.error('Error filtering movies:', error);
    res.status(500).json({ error: 'Failed to filter movies' });
  }
};
