const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('e_commerce_kubernetes', 'root', 'Irwog@12', {
    host: 'localhost',
    dialect: 'mysql'
  });
  



module.exports = sequelize