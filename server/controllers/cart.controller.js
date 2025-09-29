const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");

exports.getCartItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "cartItems.product",
  });

  res.json({
    success: true,
    cartItems: user.cartItems,
  });
});

exports.addToCart = asyncHandler(async (req, res) => {
  const { id: productId, quantity } = req.body;
  const user = await User.findById(req.user._id);

  const existingItem = user.cartItems.find(
    (item) => item.product === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cartItems.push({ product: productId, quantity });
  }

  res.json({
    success: true,
    cartItems: user.cartItems,
  });
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const { id: productId } = req.body;

  const user = await User.findById(req.user._id);

  user.cartItems = user.cartItems.filter((item) => item.product !== productId);

  await user.save();

  res.json({
    success: true,
    cartItems: user.cartItems,
  });
});

exports.updateQuantity = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  const { quantity } = req.body;
  const user = await User.findById(req.user._id);
  const existingItem = user.cartItems.find(item.product === productId);

  if (!existingItem) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (quantity === 0) {
    user.cartItems = user.cartItems.filter(
      (item) => item.product !== productId
    );
  } else {
    existingItem.quantity = quantity;
  }
  await user.save();

  res.json({
    success: true,
    cartItems: user.cartItems,
  });
});

exports.clearCart = asyncHandler(async (req, res) => {});
