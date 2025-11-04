const express = require("express");
const { protected, admin } = require("../middleware/auth.middleware");
const { getAnalytics } = require("../controllers/analytics.controller");

const router = express.Router();

router.get("/", protected, admin, getAnalytics);

module.exports = router;
