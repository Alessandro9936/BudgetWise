require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");

const dbConnect = require("./config/db.config");

// Import routes
const userRoutes = require("./routes/user-routes");
const transactionRoutes = require("./routes/transaction-routes");
const budgetRoutes = require("./routes/budget-routes");

// Initiate app and connect to database
const app = express();
dbConnect();
app.listen(process.env.PORT || 8000);

// Initiate middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Initiate routes
app.use("/", userRoutes);
app.use("/", transactionRoutes);
app.use("/", budgetRoutes);

// Handle error if route not found (error 404) ot DB connection error
app.use((req, res, next) => {
  next(createHttpError(404));
});

// Error handler
app.use(errorHandler);

module.exports = app;
