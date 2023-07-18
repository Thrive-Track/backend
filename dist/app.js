"use strict";

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
dotenv.config();
console.log(process.env.MONGO_URI);
connectDB(process.env.MONGO_URI);
const app = express();
module.exports = app;