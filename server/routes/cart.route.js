const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const {
  updateCart,
  getCartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/cart.controller");

const router = express.Router();

router.route("/").get(protected, getCartItems).post(protected, updateCart);
router.post("/add", protected, addToCart);
router.post("/remove", protected, removeFromCart);
router.post("/update-qty", protected, updateQuantity);

module.exports = router;
