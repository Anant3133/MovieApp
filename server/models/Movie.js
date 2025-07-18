const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Genre = require('./Genre');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
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
    allowNull: false
  },
  genreId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Genres',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

Movie.belongsTo(Genre, { foreignKey: 'genreId' });
Genre.hasMany(Movie, { foreignKey: 'genreId' });

module.exports = Movie;
