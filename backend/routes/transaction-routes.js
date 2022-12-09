const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

const {
  userTransactions,
  newTransaction,
  updateTransaction,
  getTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const { validateTransaction } = require("../middlewares/validateTransaction");

router.get("/api/transactions", protect, userTransactions);
router.post("/api/transactions", protect, validateTransaction, newTransaction);
router.put(
  "/api/transactions/:id",
  protect,
  validateTransaction,
  updateTransaction
);
router.delete("/api/transactions/:id", protect, deleteTransaction);
router.get("/api/transactions/:id", protect, getTransaction);

module.exports = router;
