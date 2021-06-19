const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('e_commerce_kubernetes', 'root', 'Mindtree@12345', {
    host: 'localhost',
    dialect: 'mysql'
  });
  



module.exports = sequelize