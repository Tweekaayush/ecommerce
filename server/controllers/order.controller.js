const asyncHandler = require("../middleware/asyncHandler");
const Order = require("../models/order.model");

exports.getMyOrders = asyncHandler(async (req, res) => {
  const orderList = await Order.find({ user: req.user._id });

  res.json({
    success: true,
    orderList: orderList || [],
  });
});

exports.getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found!");
  }

  res.json({
    success: true,
    order,
  });
});

exports.updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  const updateOrder = order.save();

  res.json({
    success: true,
    order: updatedOrder,
  });
});
