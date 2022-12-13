const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transactionSchema = new schema({
  user: { type: schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["income", "expense"] },
  amount: { type: Number },
  description: { type: String },
  date: { type: Date },
  budget: { type: schema.Types.ObjectId, ref: "Budget" },
  state: { type: String, enum: ["paid", "topay", "upcoming"] },
});

module.exports = mongoose.model("Transaction", transactionSchema);
