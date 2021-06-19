const Sequelize = require('sequelize')
const { DataTypes } = require("sequelize"); 
  
const sequelize = require('./connection_factory')

const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
      }
  });

module.exports = User