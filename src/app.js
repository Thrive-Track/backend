const express = require('express');
const  dotenv = require('dotenv'); 
const morgan = require('morgan');
const cors = require('cors');

const database = require('./config/database');


dotenv.config();

database.connectDB();

const app = express();

app.use(express.json())
app.use(morgan('combined'))
app.use(cors());
app.use('/users', require('./routes/users.routes'));
app.use('/task', require('./routes/tasks.routes'));



module.exports = app;

