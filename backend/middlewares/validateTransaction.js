const { body, validationResult } = require("express-validator");

const validateTransaction = [
  body("type")
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["income", "expense"])
    .withMessage("Transaction type can only be income or expense"),
  body("amount")
    .notEmpty()
    .withMessage("Transaction amount is required")
    .isNumeric()
    .withMessage("Transaction amount must be a number"),
  body("date").notEmpty().withMessage("Transaction date is required"),
  body("budget")
    .if(body("type").equals("expense"))
    .notEmpty()
    .withMessage("Expense budget must be defined"),
  body("state")
    .if(body("type").equals("expense"))
    .notEmpty()
    .withMessage("Expense state must be defined")
    .isIn(["paid", "topay", "upcoming"])
    .withMessage("Indicated expense state is not provided"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }
    next();
  },
];

module.exports = { validateTransaction };
