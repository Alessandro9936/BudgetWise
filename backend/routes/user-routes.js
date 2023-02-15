const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  refreshToken,
  updateUser,
  deleteUser,
  logoutUser,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");
const {
  registationInputs,
  loginInputs,
  deleteInputs,
} = require("../middlewares/validateInputs");

router.post("/api/register", registationInputs, registerUser);
router.post("/api/login", loginInputs, loginUser);
router.get("/api/refresh", refreshToken);

router.get("/api/user", protect, getUser);
router.put("/api/user", protect, registationInputs, updateUser);
router.delete("/api/user", protect, deleteInputs, deleteUser);
router.get("/api/user/logout", logoutUser);

module.exports = router;
