require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");

const dbConnect = require("./config/db.config");

// Import routes

// Initiate app and connect to database
const app = express();
dbConnect();
app.listen(process.env.PORT || 8000);

// Initiate middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" }));

// Initiate routes

// Handle error if route not found (error 404) ot DB connection error
app.use((req, res, next) => {
  next(createHttpError(404));
});

// Error handler
app.use(errorHandler);

module.exports = app;
