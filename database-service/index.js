
const sequelize = require('./connection_factory')
const User = require('./User')
const Product = require('./Product')
const Order = require('./Order')

function getDbConnection() {
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.log('Unable to connect to the database:', error);
      }
}
sequelize.sync({force: true}) 
