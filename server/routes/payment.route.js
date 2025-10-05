const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const {
  createCheckoutSession,
  checkoutSuccess,
  stripeKey,
} = require("../controllers/payment.controller");

const router = express.Router();

router.post("/create-checkout-session", protected, createCheckoutSession);
router.post("/checkout-success", protected, checkoutSuccess);
router.get("/key", protected, stripeKey);

module.exports = router;
