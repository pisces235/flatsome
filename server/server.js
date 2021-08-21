// Importing required modules
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const route = require('./routes/api');
const db = require('./config/database');

// Connect to DB
db.connect();

// parse env variables
require('dotenv').config();

// Configuring port
const port = process.env.PORT || 9000;

const app = express();

// Configure middlewares
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:8080']
}));
app.use(express.static("uploads"));

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
route(app);

// Listening to port
app.listen(port);
console.log(`Server running at http://localhost:${port}`);

module.exports = app;
