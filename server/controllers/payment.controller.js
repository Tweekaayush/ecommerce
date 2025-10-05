const asyncHandler = require("../middleware/asyncHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Coupon = require("../models/coupon.model");
const Order = require("../models/order.model");
const {
  createStripeCoupon,
  createNewCoupon,
} = require("../utils/payment.util");

exports.createCheckoutSession = asyncHandler(async (req, res) => {
  const { products, couponCode, email, shippingAddress } = req.body;

  if (!Array.isArray(products) && products.length === 0) {
    res.status(400);
    throw new Error("Invalid product list");
  }

  let coupon = null;
  let totalAmount = 0;

  const lineItems = products.map((product) => {
    const amount = product.price * 100;
    totalAmount += amount * product.quantity;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          // image: product.image,
        },
        unit_amount: amount,
      },
      quantity: product.quantity,
    };
  });

  if (couponCode) {
    coupon = await Coupon.findOne({
      code: couponCode,
      userId: req.user._id,
      isActive: true,
    });

    if (coupon) {
      totalAmount -= Math.round(
        (totalAmount * coupon.discountPercentage) / 100
      );
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/failed`,
    line_items: lineItems,
    customer_email: email,
    payment_method_types: ["card"],
    discounts: coupon
      ? [
          {
            coupon: await createStripeCoupon(coupon.discountPercentage),
          },
        ]
      : [],
    metadata: {
      userId: req.user._id.toString(),
      couponCode: couponCode || "",
      shippingAddress: JSON.stringify(shippingAddress),
      products: JSON.stringify(
        products.map((p) => ({
          product: p._id,
          quantity: p.quantity,
          price: p.price,
        }))
      ),
    },
  });

  res.status(200).json({
    id: session.id,
    totalAmount: totalAmount / 100,
  });
});

exports.checkoutSuccess = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
    if (session.metadata.couponCode) {
      await Coupon.findOneAndUpdate(
        {
          code: session.metadata.couponCode,
          userId: session.metadata.userId,
        },
        {
          isActive: false,
        }
      );
    }

    const products = JSON.parse(session.metadata.products);
    const shippingAddress = JSON.parse(session.metadata.shippingAddress);

    const totalAmount = session.amount_total / 100;

    const order = await Order.create({
      user: session.metadata.userId,
      products: products,
      totalAmount: totalAmount,
      stripeSessionId: sessionId,
      shippingAddress: shippingAddress,
    });

    if (totalAmount > 200) {
      const code =
        "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase();

      const date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      const coupon = new Coupon({
        code: code,
        discountPercentage: 10,
        expirationDate: date,
        isActive: true,
        userId: session.metadata.userId,
      });

      await coupon.save();

    }

    res.json({
      success: true,
      orderId: order._id,
      message: "Payment Successful, order placed.",
    });
  } else {
    res.status(404);
    throw new Error("Payment session not found");
  }
});

exports.stripeKey = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    stripeKey: process.env.REACT_APP_STRIPE_KEY,
  });
});
