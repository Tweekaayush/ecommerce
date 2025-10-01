const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const {
  updateCart,
  getCartItems,
} = require("../controllers/cart.controller");

const router = express.Router();

router
  .route("/")
  .get(protected, getCartItems)
  .post(protected, updateCart)



module.exports = router;
