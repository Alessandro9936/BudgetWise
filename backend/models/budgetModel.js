const mongoose = require("mongoose");
const schema = mongoose.Schema;

const budgetSchema = new schema({
  user: { type: schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  date: { type: Date },
  maxAmount: { type: Number },
  usedAmount: { type: Number },
});

budgetSchema.statics.getUserBudgets = function (userID) {
  return this.find({ user: userID });
};

budgetSchema.statics.addExpenseToBudget = async function (budgetID, amount) {
  const budget = await this.findById(budgetID);
  budget.usedAmount += amount;
  await budget.save();
};
budgetSchema.statics.deleteExpenseToBudget = async function (budgetID, amount) {
  const budget = await this.findById(budgetID);
  budget.usedAmount -= amount;
  await budget.save();
};

module.exports = mongoose.model("Budget", budgetSchema);
