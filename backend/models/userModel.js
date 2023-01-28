const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const userSchema = new schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    userBudget: { type: Number, required: true },
    password: { type: String, required: true },
    currency: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const secret = JWT_SECRET;
  const token = jwt.sign({ id: user.id }, secret, { expiresIn: "10m" });
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const user = this;
  const secret = REFRESH_TOKEN_SECRET;
  const refreshToken = jwt.sign({ id: user.id }, secret, { expiresIn: "30d" });
  return refreshToken;
};

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

module.exports = mongoose.model("User", userSchema);
