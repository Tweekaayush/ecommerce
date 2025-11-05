const asyncHandler = require("../middleware/async.middleware");
const Coupon = require("../models/coupon.model");

exports.getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({ userId: req.user._id, isActive: true });
  res.json({
    success: true,
    coupons,
  });
});

exports.validateCoupon = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const coupon = await Coupon.findOne({
    code: code,
    userId: req.user._id,
    isActive: true,
  });

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  if (coupon.expirationDate < new Date()) {
    coupon.isActive = false;
    await coupon.save();
    res.status(404);
    throw new Error("Coupon expired");
  }

  res.json({
    success: true,
    coupon: coupon,
    message: "Coupon Applied",
  });
});
