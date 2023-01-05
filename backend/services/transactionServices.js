const Transaction = require("../models/transactionModel");
const Budget = require("../models/budgetModel");
const {
  endOfYear,
  endOfMonth,
  startOfMonth,
  startOfYear,
} = require("date-fns");
const { default: mongoose } = require("mongoose");

const userTransactionsService = async (userID, query) => {
  const filtersInQuery = { ...query };
  const excludeNotFilters = ["sort", "page"];
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

  const pipeline = [
    { $match: { user: mongoose.Types.ObjectId(newQuery.user) } },
  ];

  if (newQuery?.type) {
    if (newQuery.type === "income") {
      pipeline.push({ $match: { type: newQuery.type } });
    }
    if (newQuery.type === "expense") {
      pipeline.push({
        $match: {
          type: newQuery.type,
        },
      });

      pipeline.push(
        {
          $lookup: {
            from: "budgets",
            localField: "budget",
            foreignField: "_id",
            as: "budget",
          },
        },
        { $unwind: "$budget" },
        {
          $project: {
            _id: 1,
            user: 1,
            type: 1,
            category: 1,
            amount: 1,
            state: 1,
            budget: { name: 1, _id: 1 },
            date: 1,
          },
        }
      );
    }
  }

  if (newQuery?.budget) {
    pipeline.push({
      $match: {
        "budget.name": {
          $in: Array.isArray(newQuery.budget)
            ? newQuery.budget
            : [newQuery.budget],
        },
      },
    });
  }

  if (newQuery?.state) {
    pipeline.push({
      $match: {
        state: {
          $in: Array.isArray(newQuery.state)
            ? newQuery.state
            : [newQuery.state],
        },
      },
    });
  }

  if (newQuery?.date) {
    const start = Number(newQuery.date)
      ? startOfYear(new Date(newQuery.date))
      : startOfMonth(new Date(newQuery.date));
    const end = Number(newQuery.date)
      ? endOfYear(new Date(newQuery.date))
      : endOfMonth(new Date(newQuery.date));

    pipeline.push({
      $match: {
        date: {
          $gte: start,
          $lt: end,
        },
      },
    });
  }

  if (newQuery?.range) {
    const start = Array.isArray(newQuery.range)
      ? startOfMonth(new Date(newQuery.range[0]))
      : startOfMonth(new Date(newQuery.range));

    const end = Array.isArray(newQuery.range)
      ? endOfMonth(new Date(newQuery.range[1]))
      : endOfMonth(new Date(newQuery.range));

    pipeline.push({
      $match: {
        date: {
          $gte: start,
          $lt: end,
        },
      },
    });
  }

  if (query?.sort) {
    const sortCriteria = query.sort.includes("amount")
      ? { amount: query.sort.startsWith("-") ? -1 : 1 }
      : { date: query.sort.startsWith("-") ? -1 : 1 };
    pipeline.push({ $sort: sortCriteria });
  }

  if (query?.page) {
    pipeline.push(
      {
        $skip: (query.page - 1) * 10,
      },
      {
        $limit: 10,
      }
    );
  }

  const transactions = await Transaction.aggregate(pipeline).exec();
  return transactions;
};

const newTransactionService = async (req) => {
  try {
    const transaction = new Transaction({
      user: req.user._id,
      type: req.body.type,
      amount: req.body.amount,
      currency: req.user.currency,
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
      if (value && oldTransaction[key] !== body[key]) {
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
    return await Transaction.findByIdAndRemove(id);
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
