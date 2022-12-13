const Transaction = require("../models/transactionModel");
const Budget = require("../models/budgetModel");
const { isSameYear, isSameMonth } = require("date-fns");

const userTransactionsService = async (userID, query) => {
  try {
    const { date, sort, ...filters } = query;

    let transactions = await Transaction.find({
      user: userID,
      ...filters,
    }).sort(sort);

    if (date) {
      transactions = transactions.filter((transaction) =>
        Number(date)
          ? isSameYear(new Date(transaction.date), new Date(date))
          : isSameMonth(new Date(transaction.date), new Date(date))
      );
    }

    return transactions;
  } catch (error) {
    throw new Error(error);
  }
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
