const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getFeaturedMovies,
  filterMovies
} = require('../controllers/movieController');
router.get('/filter', filterMovies);
router.get('/', getAllMovies);
router.get('/featured', getFeaturedMovies);  
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
