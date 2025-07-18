const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.hasMany(Chat, { foreignKey: 'userId' });
Chat.belongsTo(User, { foreignKey: 'userId' });

module.exports = Chat;
