const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('movieapp', 'postgres', 'Anant', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

module.exports = sequelize;
