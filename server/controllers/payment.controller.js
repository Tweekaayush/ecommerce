const asyncHandler = require("../middleware/asyncHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Coupon = require("../models/coupon.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
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

  const user = await User.findByIdAndUpdate(req.user._id, {
    cartItems: [],
  });

  let coupon = null;
  let totalAmount = 0;
  const order = new Order();

  const lineItems = products.map((item) => {
    const amount = item.product.price * 100;
    totalAmount += amount * item.quantity;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          // image: product.image,
        },
        unit_amount: amount,
      },
      quantity: item.quantity,
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
      order.discountPercentage = coupon.discountPercentage;
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
      orderId: order._id.toString(),
      userId: req.user._id.toString(),
      couponCode: couponCode || "",
      shippingAddress: JSON.stringify(shippingAddress),
      products: JSON.stringify(
        products.map((p) => ({
          product: p.product._id,
          quantity: p.quantity,
          price: p.product.price,
        }))
      ),
    },
  });

  order.user = req.user._id.toString();
  order.products = products.map((p) => ({
    product: p.product._id,
    quantity: p.quantity,
    price: p.product.price,
  }));
  order.totalAmount = totalAmount / 100;
  order.shippingAddress = shippingAddress;
  order.stripeSessionId = session.id;

  await order.save();

  res.status(200).json({
    success: true,
    id: session.id,
  });
});
exports.retryPayment = asyncHandler(async (req, res) => {
  const { sessionId, email } = req.body;

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const {
    products: orderProducts,
    couponCode,
    shippingAddress,
  } = session.metadata;

  let products = JSON.parse(orderProducts);

  products = await Product.populate(products, {
    path: "product",
  });

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
          name: product.product.name,
          image: product.image,
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

  const order = await Order.findById(session.metadata.orderId);

  const newSession = await stripe.checkout.sessions.create({
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
      orderId: order._id.toString(),
      userId: req.user._id.toString(),
      couponCode: couponCode || "",
      shippingAddress: shippingAddress,
      products: orderProducts,
    },
  });

  order.stripeSessionId = newSession.id;

  await order.save();

  res.status(200).json({
    success: true,
    id: newSession.id,
  });
});

exports.checkoutSuccess = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const products = JSON.parse(session.metadata.products);

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

    const order = await Order.findById(session.metadata.orderId);

    order.paymentStatus = "paid";

    const updatedOrder = await order.save();

    const totalAmount = session.amount_total / 100;

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
        stripeSessionId: sessionId,
      });

      await coupon.save();
    }

    products.forEach(async (item) => {
      const p = await Product.findById(item.product);
      p.countInStock -= item.quantity;
      await p.save();
    });

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
