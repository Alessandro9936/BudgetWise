const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

const {
  userBudgets,
  newBudget,
  updateBudget,
  getBudget,
  deleteBudget,
} = require("../controllers/budgetController");
const { validateBudget } = require("../middlewares/validateBudget");

router.get("/api/budgets", protect, userBudgets);
router.post("/api/budgets", protect, validateBudget, newBudget);
router.put("/api/budgets/:id", protect, validateBudget, updateBudget);
router.delete("/api/budgets/:id", protect, deleteBudget);
router.get("/api/budgets/:id", protect, getBudget);

module.exports = router;
