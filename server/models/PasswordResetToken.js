const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

const PasswordResetToken = sequelize.define('PasswordResetToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});

User.hasOne(PasswordResetToken, { foreignKey: 'userId' });
PasswordResetToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = PasswordResetToken;
