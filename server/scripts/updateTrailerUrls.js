require('dotenv').config();
const sequelize = require('../database');
const Movie = require('../models/Movie');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function getEmbedUrl(originalUrl) {
  const match = originalUrl.match(/v=([a-zA-Z0-9_-]{11})([^\s]*)/);
  if (!match) return null;

  const videoId = match[1];
  const extraParams = match[2] || '';
  return `https://www.youtube.com/embed/${videoId}${extraParams}`;
}

async function updateTrailerUrls() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    const movies = await Movie.findAll({
      where: {
        trailerUrl: {
          [Op.like]: '%watch?v=%'
        }
      }
    });

    for (const movie of movies) {
      if (movie.trailerUrl) {
        const updatedUrl = getEmbedUrl(movie.trailerUrl);
        if (updatedUrl) {
          console.log(`Old: ${movie.trailerUrl}`);
          console.log(`New: ${updatedUrl}`);
          movie.trailerUrl = updatedUrl;
          await movie.save();
          console.log(`Updated trailer URL for: ${movie.title}`);
        } else {
          console.log(`Could not parse URL: ${movie.trailerUrl}`);
        }
      }
    }

    console.log('All trailer URLs updated successfully');
    process.exit(0);
  } catch (err) {
    console.error('Failed to update trailer URLs:', err);
    process.exit(1);
  }
}

updateTrailerUrls();
