const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const {
  getMyOrders,
  getOrderById,
  updateOrder,
} = require("../controllers/order.controller");

const router = express.Router();

router.get("/my-orders", protected, getMyOrders);
router.route("/:id").get(protected, getOrderById).put(protected, updateOrder);

module.exports = router;
