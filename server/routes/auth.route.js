const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const { signup, login, logout } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
