require("dotenv").config();
const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const port = process.env.PORT || 8000;

const dbConnect = require("./config/db.config");

// Import routes
const userRoutes = require("./routes/user-routes");
const transactionRoutes = require("./routes/transaction-routes");
const budgetRoutes = require("./routes/budget-routes");

// Initiate app and connect to database
const app = express();
dbConnect();
app.listen(port, () => console.log(`Server started on port ${port}`));

// Initiate middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "https://budgetwise.onrender.com", credentials: true }));

// Initiate routes
app.use("/", userRoutes);
app.use("/", transactionRoutes);
app.use("/", budgetRoutes);

// Catch-all route handler to serve the index.html file
app.use(express.static(path.join(__dirname, "../frontend2/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend2/dist", "index.html"));
});

// Handle error if route not found (error 404) ot DB connection error
app.use((req, res, next) => {
  next(createHttpError(404));
});

// Error handler
app.use(errorHandler);

module.exports = app;
