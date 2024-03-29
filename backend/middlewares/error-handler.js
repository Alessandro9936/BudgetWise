const errorHandlerMiddleware = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
    status: error.status || 500,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

module.exports = errorHandlerMiddleware;
