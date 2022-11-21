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

router.post("/register", registationInputs, registerUserHandler);
router.post("/login", loginInputs, loginUserHandler);
router.post("/refresh", refreshTokenHandler);

router.get("/user", protect, getUserHandler);
router.put("/user", protect, registationInputs, updateUserHandler);
router.post("/user", protect, logoutUser);
router.delete("/user", protect, deleteUserHandler);

module.exports = router;
