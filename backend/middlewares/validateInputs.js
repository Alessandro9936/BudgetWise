const { body, validationResult } = require("express-validator");

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);

  // If validation result got errors throw them to be handled
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
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
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("Only letters allowed")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Use a valid email format (john@example.com)")
    .normalizeEmail(),
  body("password")
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
    ),
  (req, res, next) => {
    validateInputs(req, res, next);
  },
];

const loginInputs = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Use a valid email format (john@example.com)")
    .normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    validateInputs(req, res, next);
  },
];

module.exports = { registationInputs, loginInputs };
