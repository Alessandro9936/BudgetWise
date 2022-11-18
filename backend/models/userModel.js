const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const userSchema = new schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userBudget: { type: Number, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

module.exports = mongoose.model("User", userSchema);
