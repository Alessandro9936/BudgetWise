const {
  isSameYear,
  isSameMonth,
  addDays,
  isLastDayOfMonth,
  isFirstDayOfMonth,
} = require("date-fns");
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
  // When a new budget is created, its date property, if it is not created in the current month, will be by default formatted as follows (ex. creating a new budget in March 2023): Tue Feb 28 2023 23:00:00 GMT+0000. However, when it comes to production, the property date is detected as a date that still belongs to February, perhaps due to an incongruity with timezones between client and platform on which the server is deployed. As a consequence, when a budget is created in a future month, it will be set in the previous month, in our example if we create a budget in March it will be set to February. To avoid this problem, although it may not be the best solution, when creating a new budget in the future add a fews days to be sure that it will be set to the right month.
  const budgetMonth = isFirstDayOfMonth(new Date(req.body.date))
    ? addDays(new Date(req.body.date), 7)
    : new Date(req.body.date);

  try {
    const budget = new Budget({
      user: req.user._id,
      name: req.body.name,
      date: budgetMonth,
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
