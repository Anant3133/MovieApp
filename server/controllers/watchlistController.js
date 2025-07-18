const Watchlist = require('../models/Watchlist');
const Movie = require('../models/Movie');
const User = require('../models/User');

exports.addToWatchlist = async (req, res) => {
  const { movieId } = req.body;
  try {
    await Watchlist.create({ userId: req.user.id, movieId });
    res.status(201).json({ message: 'Movie added to watchlist' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getWatchlist = async (req, res) => {
  try {
    const userWithMovies = await User.findByPk(req.user.id, {
      include: {
        model: Movie,
        as: 'Movies',
        attributes: ['id', 'title', 'posterUrl', 'synopsis', 'genre', 'releaseYear', 'rating', 'cast'],
        through: { attributes: [] }
      }
    });
    res.status(200).json(userWithMovies ? userWithMovies.Movies : []);
  } catch (err) {
    console.error('Error fetching watchlist:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;
    await Watchlist.destroy({ where: { userId: req.user.id, movieId } });
    res.json({ message: 'Removed from watchlist' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
