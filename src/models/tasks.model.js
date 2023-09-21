const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.sq.define('task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dueDate: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Task;