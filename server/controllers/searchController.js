const Movie = require('../models/Movie');
const { Op } = require('sequelize');

exports.searchMovies = async (req, res) => {
  const { q, genre } = req.query;
  const filters = {};

  if (q) filters.title = { [Op.iLike]: `%${q}%` };
  if (genre) filters.genreId = genre;

  try {
    const results = await Movie.findAll({ where: filters });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};
