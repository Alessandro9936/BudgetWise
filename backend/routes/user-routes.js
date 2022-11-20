const express = require("express");
const router = express.Router();

router.post("/register");
router.post("/login");
router.post("/refresh");

router.get("/user");
router.put("/user");
router.post("/user");
router.delete("/user");

module.exports = router;
