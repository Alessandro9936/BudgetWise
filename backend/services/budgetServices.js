const Budget = require("../models/budgetModel");

const userBudgetsService = async (userID) => {
  try {
    const userBudgets = await Budget.getUserBudgets(userID);
    return userBudgets;
  } catch (error) {
    throw new Error(error);
  }
};

const newBudgetService = async (req) => {
  try {
    const budget = new Budget({
      user: req.user._id,
      name: req.body.name,
      maxAmount: req.body.maxAmount,
      usedAmount: req.body.usedAmount,
      date: req.body.month,
    });

    await budget.save();
    return budget;
  } catch (error) {
    throw new Error(error);
  }
};

const updateBudgetService = async (id, body) => {
  try {
    const oldBudget = await Budget.findById(id);

    for ([key, value] of Object.entries(body)) {
      if (oldBudget[key] !== body[key]) {
        oldBudget[key] = value;
      }
    }

    const updatedBudget = oldBudget.save();
    return updatedBudget;
  } catch (error) {
    throw new Error(error);
  }
};

const getBudgetService = async (id) => {
  try {
    const budget = await Budget.findById(id);
    return budget;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteBudgetService = async (id) => {
  try {
    await Budget.findByIdAndRemove(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  userBudgetsService,
  newBudgetService,
  updateBudgetService,
  getBudgetService,
  deleteBudgetService,
};
