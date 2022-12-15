const createHttpError = require("http-errors");

const {
  userTransactionsService,
  newTransactionService,
  updateTransactionService,
  getTransactionService,
  deleteTransactionService,
} = require("../services/transactionServices");

// @desc get all transactions of logged user
// @route GET /api/transactions
// @access Private
const userTransactions = async (req, res, next) => {
  try {
    const { id: userID } = req.user;
    const transactions = await userTransactionsService(userID, req.query);

    res.status(200).json(transactions);
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc create new transaction
// @route POST /api/transactions
// @access Private
const newTransaction = async (req, res, next) => {
  try {
    const transaction = await newTransactionService(req);
    res.status(201).json(transaction);
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc update transaction
// @route PUT /api/transactions/:id
// @access Private
const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await updateTransactionService(id, req.body);
    res.status(201).json(updatedTransaction);
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc get transaction details
// @route GET /api/transactions/:id
// @access Private
const getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await getTransactionService(id);

    res.status(200).json(transaction);
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc delete transaction
// @route DELETE /api/transactions/:id
// @access Private
const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteTransactionService(id);

    res.status(204).end();
  } catch (error) {
    next(createHttpError(error));
  }
};

module.exports = {
  userTransactions,
  newTransaction,
  updateTransaction,
  getTransaction,
  deleteTransaction,
};
