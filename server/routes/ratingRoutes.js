const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { submitRating, getRatingsForMovie } = require('../controllers/ratingController');

router.post('/', authenticate, submitRating);
router.get('/:id', getRatingsForMovie);

module.exports = router;
