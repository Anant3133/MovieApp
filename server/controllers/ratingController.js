const Rating = require('../models/Rating');

exports.submitRating = async (req, res) => {
  const { movieId, rating } = req.body;
  await Rating.create({ userId: req.user.id, movieId, rating });
  res.status(201).json({ message: 'Rating submitted' });
};

exports.getRatingsForMovie = async (req, res) => {
  const ratings = await Rating.findAll({ where: { movieId: req.params.id } });
  res.json(ratings);
};
