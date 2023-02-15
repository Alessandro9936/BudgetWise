const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const User = require("../models/userModel");

const { JWT_SECRET } = process.env;

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader?.startsWith("Bearer")) {
    try {
      // Get token from header
      const token = authHeader.split(" ")[1]; // Bearer Token

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      next(createHttpError(401, "Not authorized"));
    }
  } else {
    next(createHttpError(401, "Not authorized"));
  }
};

module.exports = { protect };
