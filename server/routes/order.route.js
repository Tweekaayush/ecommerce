const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const {
  getMyOrders,
  getOrderById,
  updateOrder,
  getOrdersList,
} = require("../controllers/order.controller");

const router = express.Router();

router.get("/my-orders", protected, getMyOrders);
router.get("/list", protected, getOrdersList);
router.route("/:id").get(protected, getOrderById).put(protected, updateOrder);

module.exports = router;
