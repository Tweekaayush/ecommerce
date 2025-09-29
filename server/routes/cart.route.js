const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const {
  addToCart,
  removeFromCart,
  getCartItems,
  updateQuantity,
} = require("../controllers/cart.controller");

const router = express.Router();

router
  .route("/")
  .get(protected, getCartItems)
  .post(protected, addToCart)
  .delete(protected, removeFromCart);
router.put("/:id", updateQuantity);

module.exports = router;
