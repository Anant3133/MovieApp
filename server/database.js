const { Sequelize } = require('sequelize');
require('dotenv').config(); // Make sure this line is at the top

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Render requires SSL but allows self-signed
    }
  }
});

module.exports = sequelize;