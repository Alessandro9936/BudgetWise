const { body, validationResult } = require("express-validator");

const validateBudget = [
  body("name").notEmpty().withMessage("Expense budget must be defined"),
  body("maxAmount")
    .notEmpty()
    .withMessage("Total amount of budget must be defined")
    .isNumeric()
    .withMessage("Total amount must be a number"),
  body("usedAmount")
    .notEmpty()
    .withMessage("Used amount of budget must be defined")
    .isNumeric()
    .withMessage("Used amount must be a number"),
  body("date").notEmpty().withMessage("Transaction date is required"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }
    next();
  },
];

module.exports = { validateBudget };
