const Transaction = require("../models/transactionModel");
const Budget = require("../models/budgetModel");
const { isSameYear, isSameMonth } = require("date-fns");

const userTransactionsService = async (userID, query) => {
  //BUILD QUERY
  // 1A) Filtering
  const queryObj = { query, user: userID };
  const excludedFields = ["year", "date", "state", "budget", "sort"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // 1B) Advanced Filtering
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );

  let transactions = await Transaction.find(JSON.parse(queryString));

  if (query.type === "expense" && query.state?.length > 0) {
    const states = query.state.includes(",")
      ? query.state?.split(",")
      : [query.state];

    transactions = await Transaction.find(JSON.parse(queryString), {
      state: states,
    });
  }

  //let transactions;
  /* if (date) {
    transactions = transactions.filter((transaction) =>
      Number(date)
        ? isSameYear(new Date(transaction.date), new Date(date))
        : isSameMonth(new Date(transaction.date), new Date(date))
    );
  } */
};

const newTransactionService = async (req) => {
  try {
    const transaction = new Transaction({
      user: req.user._id,
      type: req.body.type,
      amount: req.body.amount,
      date: req.body.date,
      description: req.body.description,
    });

    if (transaction.type === "expense") {
      transaction.budget = req.body.budget;
      transaction.state = req.body.state;
      Budget.addExpenseToBudget(req.body.budget, req.body.amount);
    }

    await transaction.save();
    return transaction;
  } catch (error) {
    throw new Error(error);
  }
};

const updateTransactionService = async (id, body) => {
  try {
    const oldTransaction = await Transaction.findById(id);

    for ([key, value] of Object.entries(body)) {
      if (oldTransaction[key] !== body[key]) {
        oldTransaction[key] = value;
      }
    }

    const updatedTransaction = oldTransaction.save();
    return updatedTransaction;
  } catch (error) {
    throw new Error(error);
  }
};

const getTransactionService = async (id) => {
  try {
    const transaction = await Transaction.findById(id);
    return transaction;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTransactionService = async (id) => {
  try {
    await Transaction.findByIdAndRemove(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  userTransactionsService,
  newTransactionService,
  updateTransactionService,
  getTransactionService,
  deleteTransactionService,
};
