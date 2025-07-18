const Joi = require('joi');

const ratingDTO = Joi.object({
  movieId: Joi.number().integer().required(),
  rating: Joi.number().min(1).max(10).required()
});

module.exports = ratingDTO;
