const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  const errors = validationResult(req);

  // If validation result got errors throw them to be handled
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
    return;
  }
  next();
};

const registationInputs = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("Only letters allowed")
    .escape(),
  body("lastName")
    .if(body("lastName").exists({ checkFalsy: true }))
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Only letters allowed")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Use a valid email format (john@example.com)")
    .normalizeEmail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });

      if (user && user.email !== req.user?.email) {
        return Promise.reject("Email already in use");
      }
    }),
  body("password")
    .if(body("password").exists())
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be greater than 6 and contain at least one uppercase letter, one number and one symbol"
    )
    .custom(async (_, { req }) => {
      if (req.body.oldPassword) {
        const user = await User.findOne({ email: req.body.email });
        const isValid = await user.isValidPassword(req.body.oldPassword);
        console.log(isValid);
        if (!isValid) {
          return Promise.reject("This is not your current password");
        }
      }
      return Promise.resolve();
    }),
  (req, res, next) => {
    validateResults(req, res, next);
  },
];

const loginInputs = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Use a valid email format (john@example.com)")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) {
        return Promise.reject("Email is not valid");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      const isValid = await user.isValidPassword(value);
      if (!isValid) {
        return Promise.reject("Invalid password");
      }
    }),
  (req, res, next) => {
    validateResults(req, res, next);
  },
];

module.exports = { registationInputs, loginInputs };
