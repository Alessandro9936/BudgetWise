const { isSameYear, isSameMonth, addDays } = require("date-fns");
const Budget = require("../models/budgetModel");
const Transaction = require("../models/transactionModel");

const userBudgetsService = async (userID, query) => {
  try {
    const dateFilter = query.date;

    const userBudgets = await Budget.find({ user: userID });

    // First condition get budgets of each month in year
    // Second condition get budgets of single month
    const filterBudgetsByDate = userBudgets.filter((budget) =>
      Number(dateFilter)
        ? isSameYear(new Date(budget.date), new Date(dateFilter))
        : isSameMonth(new Date(budget.date), new Date(dateFilter))
    );

    /* 
    When budgets are filtered by year, all the budgets in each month are returned. This allow to reduce and sum the budgets with same type (ex. all "groceries" budgets) in a single object.

    If dateFilter can be converted to a number it means that timeSpan of requested date is equal to year. If it doesn't convert to a number timeSpan of requested date must be month, no need to reduce budgets.
    */
    return Number(dateFilter)
      ? filterBudgetsByDate.reduce((previousValue, budget) => {
          const budgetByName = previousValue.find(
            (_budget) => _budget.name === budget.name
          );
          if (!budgetByName) {
            previousValue = [
              ...previousValue,
              {
                name: budget.name,
                date: budget.date,
                usedAmount: budget.usedAmount,
                maxAmount: budget.maxAmount,
                _id: budget._id,
              },
            ];
          } else {
            budgetByName.usedAmount += budget.usedAmount;
            budgetByName.maxAmount += budget.maxAmount;
          }
          return previousValue;
        }, [])
      : filterBudgetsByDate;
  } catch (error) {
    throw new Error(error);
  }
};

const newBudgetService = async (req) => {
  try {
    const budget = new Budget({
      user: req.user._id,
      name: req.body.name,
      date: addDays(new Date(req.body.date), 1),
      maxAmount: Number(req.body.maxAmount),
      usedAmount: Number(req.body.usedAmount),
    });

    console.log(budget);

    await budget.save();
    return budget;
  } catch (error) {
    throw new Error(error);
  }
};

const updateBudgetService = async (id, body) => {
  try {
    const oldBudget = await Budget.findById(id);

    oldBudget.maxAmount = Number(body.maxAmount);

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
    Transaction.deleteTransactionsInBudget(id);
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
