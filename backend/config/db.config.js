require("dotenv").config();
const mongoose = require("mongoose");
const app = require("../server");

function dbConnect() {
  const URI = process.env.DB_STRING;

  // Setup default connection
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get connection
  const database = mongoose.connection;

  database.on("error", console.error.bind(console));
}

module.exports = dbConnect;
