const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const {
  validateCoupon,
  getCoupon,
} = require("../controllers/coupon.controller");

const router = express.Router();

router.get("/", protected, getCoupon);
router.post("/validate", protected, validateCoupon);

module.exports = router;
