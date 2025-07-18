const HeroCarousel = require('../models/HeroCarousel');

exports.getAllHeroItems = async (req, res) => {
  try {
    const items = await HeroCarousel.findAll({
      where: { isActive: true },
      order: [['order', 'ASC']],
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hero carousel items' });
  }
};

exports.getHeroItemById = async (req, res) => {
  try {
    const item = await HeroCarousel.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Hero carousel item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch hero carousel item' });
  }
};

exports.createHeroItem = async (req, res) => {
  try {
    const newItem = await HeroCarousel.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create hero carousel item' });
  }
};

exports.updateHeroItem = async (req, res) => {
  try {
    const item = await HeroCarousel.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Hero carousel item not found' });
    }
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update hero carousel item' });
  }
};

exports.deleteHeroItem = async (req, res) => {
  try {
    const item = await HeroCarousel.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Hero carousel item not found' });
    }
    await item.destroy();
    res.json({ message: 'Hero carousel item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete hero carousel item' });
  }
};
