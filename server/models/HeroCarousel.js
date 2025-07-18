const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const HeroCarousel = sequelize.define('HeroCarousel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.TEXT,
  },
  posterUrl: {
    type: DataTypes.STRING,
  },
  genre: {
    type: DataTypes.STRING,
  },
  length: {
    type: DataTypes.STRING,
  },
  cast: {
    type: DataTypes.TEXT,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
  },
  trailerUrl: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0, 
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = HeroCarousel;
