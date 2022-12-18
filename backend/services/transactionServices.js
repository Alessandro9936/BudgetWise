const Transaction = require("../models/transactionModel");
const Budget = require("../models/budgetModel");
const { isSameYear, isSameMonth } = require("date-fns");

const userTransactionsService = async (userID, query) => {
  // YEAR: 2022, 2021 --> Coming from dashboard, it means that if year is specified in params return transactions filtered by year
  // ------
  // TYPE: income / expense --> Type of expense
  // DATE: November 2022 / 2022 --> Filter transaction that are inside date
  // STATE: paid / notpaid
  // BUDGET: rent, groceries, ...
  // ------
  // SORT: date / amount

  const filtersInQuery = { ...query };
  const excludeNotFilters = ["sort"];
  excludeNotFilters.forEach((el) => delete filtersInQuery[el]);

  let newQuery = { user: userID };

  for ([key, value] of Object.entries(filtersInQuery)) {
    if (value) {
      if (value.includes(",")) {
        newQuery = { ...newQuery, [key]: value.split(",") };
      } else {
        newQuery = { ...newQuery, [key]: value };
      }
    }
  }

  let transactions = await Transaction.find({ user: newQuery.user });

  if (newQuery?.type === "income") {
    transactions = await Transaction.find({
      user: newQuery.user,
      type: newQuery.type,
    });
  }

  if (newQuery?.type === "expense") {
    transactions = await Transaction.find({
      user: newQuery.user,
      type: newQuery.type,
    }).populate("budget", "name");

    if (newQuery?.budget?.length > 0) {
      transactions = transactions.filter((transaction) =>
        newQuery.budget.includes(transaction.budget.name)
      );
    }

    if (newQuery?.state?.length > 0) {
      transactions = transactions.filter((transaction) =>
        newQuery.state.includes(transaction.state)
      );
    }

    if (newQuery?.state?.length > 0 && newQuery?.budget?.length > 0) {
      transactions = transactions.filter(
        (transaction) =>
          newQuery.state.includes(transaction.state) &&
          newQuery.budget.includes(transaction.budget.name)
      );
    }
  }

  if (newQuery.date) {
    transactions = transactions.filter((transaction) =>
      Number(newQuery.date)
        ? isSameYear(new Date(transaction.date), new Date(newQuery.date))
        : isSameMonth(new Date(transaction.date), new Date(newQuery.date))
    );
  }

  console.log(transactions);
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
