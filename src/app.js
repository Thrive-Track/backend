const express = require('express');
const  dotenv = require('dotenv'); 
const morgan = require("morgan")

const connectDB = require('./config/database');


dotenv.config();

connectDB(process.env.MONGO_URI)

const app = express();

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', require('./routes/users.routes'));



module.exports = app;

