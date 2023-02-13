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
  // Build the filters object from the query
  const filtersInQuery = { ...query };

  // Remove non-filtering query parameters
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
  1. The $match stage filters the transactions to only include those that belong to the logged in user. it checks if the transaction user property matches the _id of the logged in user.

  2. The $project stage specifies the fields to include in the output documents. It also includes a computed field state that depends on the value of the type field. If the type field is equal to expense, the state field is set to the value of the state field in the input document. If the type field is equal to income or is not defined, the state field is set to empty string.

  3. The $lookup stage performs a left outer join between the Transactions collection and the budgets collection.

  The $lookup operator is used to specify the join. The from field specifies the right (inner) collection, which is the budgets collection in this case.

  The let field defines a variable budgetId that is set to the value of the budget field in the Transactions collection. This allows us to refer to the value of budget in the pipeline that is executed in the budgets collection.

  The pipeline field specifies the operations that should be performed on the right (inner) collection. In this example, two operations are performed:

  The $match operator is used to match documents in the budgets collection where the value of the _id field is equal to the value of the budgetId variable defined in the let field. This ensures that only the budget document that corresponds to the transaction is returned.

  The $project operator is used to project (or select) the fields that should be returned in the result. In this example, only the name field is selected.

  Finally, the as field specifies the name of the new array field that will be added to each document in the Transactions collection. The result of the $lookup operation will be stored in this array field.

  So, after the $lookup operation, each document in the Transactions collection will have a new array field named budget that contains the matching budget document from the budgets collection (or an empty array if there is no match).

  4. The final $project stage includes the fields from the input documents and the budget field from the budgets collection. It uses the $arrayElemAt operator to select the first element from the budget array.
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
        description: 1,
        state: {
          // $cond: { if: <boolean-expression>, then: <true-case>, else: <false-case> }
          $cond: [{ $eq: ["$type", "expense"] }, "$state", ""],
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
        description: 1,
        budget: { $arrayElemAt: ["$budget", 0] },
        date: 1,
      },
    },
  ];

  if (newQuery?.type) {
    pipeline.push({ $match: { type: newQuery.type } });
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
    const transaction = await Transaction.findById(id);

    if (transaction.type === "expense") {
      Budget.deleteExpenseToBudget(transaction.budget._id, transaction.amount);
    }

    await transaction.delete();
    return transaction;
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
