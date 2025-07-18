const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Movie = require('./Movie');

const Watchlist = sequelize.define('Watchlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
}, {
  timestamps: true,
});

User.belongsToMany(Movie, { through: Watchlist, foreignKey: 'userId', as: 'Movies' });
Movie.belongsToMany(User, { through: Watchlist, foreignKey: 'movieId', as: 'Users' });

module.exports = Watchlist;
