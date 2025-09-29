const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const { createCheckoutSession, checkoutSuccess } = require("../controllers/payment.controller");

const router = express.Router();

router.post("/create-checkout-session", protected, createCheckoutSession);
router.post("/checkout-success", protected, checkoutSuccess);

module.exports = router;
