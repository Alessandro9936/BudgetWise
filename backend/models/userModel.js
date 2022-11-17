const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const userSchema = new schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userBudget: { type: Number, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
