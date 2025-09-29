const asyncHandler = require("../middleware/asyncHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Coupon = require("../models/coupon.model");
const Order = require("../models/order.model");
const {
  createStripeCoupon,
  createNewCoupon,
} = require("../utils/payment.util");

exports.createCheckoutSession = asyncHandler(async (req, res) => {
  const { products, couponCode } = req.body;

  if (!Array.isArray(products) && products.length === 0) {
    res.status(400);
    throw new Error("Invalid product list");
  }

  let coupon = null;
  let totalAmount = 0;

  const lineItems = products.map((product) => {
    const amount = Math.round(product.price * 100);
    totalAmount += amount * product.quantity;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: product.image,
        },
        unit_amount: amount,
      },
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

  const session = await Stripe.checkout.session.create({
    line_items: lineItems,
    payment_method_types: ["card"],
    mode: "payment",
    // ui_mode: "hosted",
    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/failed`,
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
      products: JSON.stringify(
        products.map((p) => ({
          product: p._id,
          quantity: p.quantity,
          price: p.price,
        }))
      ),
    },
  });

  if (totalAmount >= 20000) {
    await createNewCoupon(req.user._id);
  }

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

    const order = await Order.create({
      user: session.metadata.userId,
      products: products,
      totalAmount: session.amount_total / 100,
      stripeSessionId: sessionId,
    });
  }

  res.json({
    success: true,
    orderId: order._id,
    message: "Payment Successful, order placed.",
  });
});
