const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    // / Without Access-Control-Allow-Credentials header, browsers will not expose the response to the requesting code if it includes credentials, and the cross-origin request will fail. This is because, by default, CORS requests are not allowed to send or receive cookies and other sensitive data.
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
