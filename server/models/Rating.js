const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Movie = require('./Movie');

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

User.hasMany(Rating, { foreignKey: 'userId' });
Movie.hasMany(Rating, { foreignKey: 'movieId' });
Rating.belongsTo(User, { foreignKey: 'userId' });
Rating.belongsTo(Movie, { foreignKey: 'movieId' });

module.exports = Rating;
