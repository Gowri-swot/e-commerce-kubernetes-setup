const Sequelize = require('sequelize')
const { DataTypes } = require("sequelize"); 
  
const sequelize = require('./connection_factory')

const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },
    created_at: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
      }
  });

module.exports = Product
