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

  /*
  1. The $match stage filters the transactions to only include those that belong to the logged in user. It does this
     by matching the user field of the transactions to the _id of the logged in user.

  2. The $project stage specifies the fields to include in the output documents. It also includes a computed field
     state that depends on the value of the type field. If the type field is equal to expense, the state field is set to the value of the state field in the input document. If the type field is equal to income or is not defined, the state field is set to the string "Received".

  3. The $lookup stage performs a left outer join with the budgets collection and returns a new array field for each
     document that contains the matching documents from the budgets collection. It does this by using the $match stage in the budgets collection to filter the budgets documents based on the value of the _id field. It then uses the $project stage to specify the fields to include in the output documents from the budgets collection.

  4. The final $project stage includes the fields from the input documents and the budget field from the budgets
     collection. It uses the $arrayElemAt operator to select the first element from the budget array.
*/

  const pipeline = [
    {
      $match: { user: mongoose.Types.ObjectId(newQuery.user) },
    },
    {
      $project: {
        _id: 1,
        user: 1,
        type: 1,
        category: 1,
        amount: 1,
        state: {
          $cond: [{ $eq: ["$type", "expense"] }, "$state", "Received"],
        },
        budget: { $ifNull: ["$budget", null] },
        date: 1,
      },
    },
    {
      $lookup: {
        from: "budgets",
        let: { budgetId: "$budget" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$budgetId"] } } },
          { $project: { name: 1 } },
        ],
        as: "budget",
      },
    },
    {
      $project: {
        _id: 1,
        user: 1,
        type: 1,
        category: 1,
        amount: 1,
        state: 1,
        budget: { $arrayElemAt: ["$budget", 0] },
        date: 1,
      },
    },
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

  console.log(pipeline);
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
