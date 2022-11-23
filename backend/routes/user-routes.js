const express = require("express");
const router = express.Router();
const {
  registerUserHandler,
  loginUserHandler,
  getUserHandler,
  refreshTokenHandler,
  updateUserHandler,
  deleteUserHandler,
  logoutUser,
} = require("../controllers/userController");

const { protect } = require("../middlewares/authMiddleware");
const {
  registationInputs,
  loginInputs,
} = require("../middlewares/validateInputs");

router.post("/api/register", registationInputs, registerUserHandler);
router.post("/api/login", loginInputs, loginUserHandler);
router.post("/api/refresh", refreshTokenHandler);

router.get("/api/user", protect, getUserHandler);
router.put("/api/user", protect, registationInputs, updateUserHandler);
router.post("/api/user", protect, logoutUser);
router.delete("/api/user", protect, deleteUserHandler);

module.exports = router;
