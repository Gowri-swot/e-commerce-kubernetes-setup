const Sequelize = require('sequelize')
const { DataTypes } = require("sequelize"); 
  
const sequelize = require('./connection_factory')

const Product = require('./Product')

const Order = sequelize.define('Order', {
    user: {
      type: DataTypes.STRING
    },
    total_price: {
        type: DataTypes.FLOAT
    },
    created_at: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
      }
  });
Product.hasMany(Order, {as: 'Workers'})
module.exports = Order

