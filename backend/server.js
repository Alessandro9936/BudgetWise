require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const createHttpError = require("http-errors");

const dbConnect = require("./config/db.config");

// Import middlewares

// Initiate app and connect to database
const app = express();
dbConnect();
app.listen(process.env.PORT || 3000);

// Connect database

// Import routes

// Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log the request
app.use(logger("dev"));

// Initiate routes

// Handle error if route not found (error 404) ot DB connection error
app.use((req, res, next) => {
  next(createHttpError(404));
});

// Error handler

module.exports = app;
