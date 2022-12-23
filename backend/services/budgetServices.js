const { isSameYear, isSameMonth } = require("date-fns");
const Budget = require("../models/budgetModel");

const userBudgetsService = async (userID, query) => {
  try {
    const dateFilter = query.date;

    const userBudgets = await Budget.find({ user: userID });

    return userBudgets.filter((budget) =>
      Number(dateFilter)
        ? isSameYear(new Date(budget.date), new Date(dateFilter))
        : isSameMonth(new Date(budget.date), new Date(dateFilter))
    );
  } catch (error) {
    throw new Error(error);
  }
};

const newBudgetService = async (req) => {
  try {
    const budget = new Budget({
      user: req.user._id,
      name: req.body.name,
      date: req.body.date,
      maxAmount: Number(req.body.maxAmount),
      usedAmount: Number(req.body.usedAmount),
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
    const budget = await Budget.findByIdAndRemove(id);
    return budget;
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
