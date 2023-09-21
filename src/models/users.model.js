const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');

const User = sq.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
   
  },
  accessToken: {
    type: DataTypes.STRING,
  }
});

User.sync()
.then(() =>{
   console.log("User model synced successfully");
})
.catch((err) =>{
  console.error(err);
})

module.exports = User;




