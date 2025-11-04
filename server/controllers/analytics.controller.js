const asyncHandler = require("../middleware/async.middleware");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");

exports.getAnalytics = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const revenueData = await Order.aggregate([
    {
      $match: {
        paymentStatus: {
          $ne: "unpaid",
        },
        orderStatus: {
          $ne: "cancel",
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: 1 },
      },
    },
  ]);

  // chart

  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const endDate = new Date();

  let salesDataChart = await Order.aggregate([
    {
      $match: {
        paymentStatus: {
          $ne: "unpaid",
        },
        orderStatus: {
          $ne: "cancel",
        },
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        sales: { $sum: 1 },
        revenue: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const datesArray = getDatesInRange(startDate, endDate);

  const chartData = datesArray.map((date) => {
    const found = salesDataChart.find((item) => item._id === date);

    return {
      date,
      sales: found?.sales || 0,
      revenue: found?.revenue || 0,
    };
  });

  const orderStatus = await Order.aggregate([
    {
      $group: {
        _id: "$orderStatus",
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({
    success: true,
    analytics: {
      totalUsers,
      totalProducts,
      totalSales: salesData[0]?.totalSales || 0,
      totalRevenue: revenueData[0]?.totalRevenue || 0,
      revenueChart: chartData,
      orderStatus,
    },
  });
});

const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
