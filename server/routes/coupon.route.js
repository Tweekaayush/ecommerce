const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const {
  validateCoupon,

  getCoupons,
} = require("../controllers/coupon.controller");

const router = express.Router();

router.get("/", protected, getCoupons);
router.post("/validate", protected, validateCoupon);

module.exports = router;
