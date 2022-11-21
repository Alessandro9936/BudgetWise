const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const User = require("../models/userModel");

const { JWT_SECRET } = process.env;

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]; // Bearer Token

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      next(createHttpError(401, "Not authorized"));
    }
  }
  if (!token) {
    next(createHttpError(401, "Not authorized"));
  }
};

module.exports = { protect };
