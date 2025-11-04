const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const { signup, login, logout, forgotPassword, resetPassword } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/password/forget", forgotPassword);
router.post("/password/reset", resetPassword);

module.exports = router;
