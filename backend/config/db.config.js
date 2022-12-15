require("dotenv").config();
const mongoose = require("mongoose");
const Budget = require("../models/budgetModel");
const Transaction = require("../models/transactionModel");

const { filteredTransactions, budgets } = require("../data");

function dbConnect() {
  const URI = process.env.DB_STRING;

  // Setup default connection
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get connection
  const database = mongoose.connection;
  /*   Budget.insertMany(budgets).then(() =>
    Transaction.insertMany(filteredTransactions).then(() => console.log("ciao"))
  ); */

  database.on("error", console.error.bind(console));
}

module.exports = dbConnect;
