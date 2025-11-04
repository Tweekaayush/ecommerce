const Coupon = require("../models/coupon.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("../middleware/async.middleware");

exports.createStripeCoupon = asyncHandler(async (discountPercentage) => {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
});

exports.createNewCoupon = asyncHandler(async (userId) => {
  const code =
    "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const newCoupon = await Coupon.create({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId: userId,
  });
});
