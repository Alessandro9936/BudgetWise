const createHttpError = require("http-errors");

const {
  userBudgetsService,
  newBudgetService,
  updateBudgetService,
  getBudgetService,
  deleteBudgetService,
} = require("../services/budgetServices");

// @desc get all budgets of logged user
// @route GET /api/budgets
// @access Private
const userBudgets = async (req, res, next) => {
  try {
    const { id: userID } = req.user;
    const budgets = await userBudgetsService(userID, req.query);
    res.status(200).json(budgets);
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc create new budget
// @route POST /api/budgets
// @access Private
const newBudget = async (req, res, next) => {
  try {
    const budget = await newBudgetService(req);
    res.status(201).json(budget);
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc update budget
// @route PUT /api/budgets/:id
// @access Private
const updateBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBudget = await updateBudgetService(id, req.body);
    res.status(201).json(updatedBudget);
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc get budget details
// @route GET /api/budgets/:id
// @access Private
const getBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const budget = await getBudgetService(id);

    res.status(200).json(budget);
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc delete budget
// @route DELETE /api/transactions/:id
// @access Private
const deleteBudget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const budget = await deleteBudgetService(id);

    res.status(200).json(budget);
  } catch (error) {
    next(createHttpError(error));
  }
};

module.exports = {
  userBudgets,
  newBudget,
  updateBudget,
  getBudget,
  deleteBudget,
};
