const { Sequelize } = require('sequelize');

// Passing the connection URI
const sequelize = new Sequelize('postgres://zccvyjsd:lXE-lihi0hzZsAghLaA_RAopTmOKugWR@silly.db.elephantsql.com/zccvyjsd');

const connectDB = async () => {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
module.exports = {connectDB, sq: sequelize} ;





