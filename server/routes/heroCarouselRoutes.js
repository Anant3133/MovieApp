const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroCarouselController');
router.get('/', heroController.getAllHeroItems);
router.get('/:id', heroController.getHeroItemById);
router.post('/', heroController.createHeroItem);
router.put('/:id', heroController.updateHeroItem);
router.delete('/:id', heroController.deleteHeroItem);

module.exports = router;
