const asyncHandler = require("../middleware/asyncHandler");
const Order = require("../models/order.model");

exports.getOrdersList = asyncHandler(async (req, res) => {
  const paginate = 6;
  const page = Number(req.query.page);
  const orderList = await Order.find()
    .limit(paginate)
    .skip(paginate * (page - 1));
  const count = await Order.countDocuments();
  res.json({
    success: true,
    orderList: orderList || [],
    totalPages: Math.ceil(count / paginate),
  });
});

exports.getMyOrders = asyncHandler(async (req, res) => {
  const paginate = 4;
  const page = Number(req.query.page);
  const orderList = await Order.find({ user: req.user._id })
    .limit(paginate)
    .skip(paginate * (page - 1));
  const count = await Order.countDocuments({ user: req.user._id });
  res.json({
    success: true,
    orderList: orderList || [],
    totalPages: Math.ceil(count / paginate),
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

  const updatedOrder = order.save();

  res.json({
    success: true,
    order: updatedOrder,
  });
});
