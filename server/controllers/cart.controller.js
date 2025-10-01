const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/product.model");
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

exports.updateCart = asyncHandler(async (req, res) => {
  const { data } = req.body;
  const user = await User.findById(req.user._id);

  let message = "";

  let updatedCart = { ...data };

  user.cartItems.forEach((x) => {
    updatedCart[x._id].quantity += x.quantity;
  });

  updatedCart = Array.from(updatedCart);
  updatedCart = updatedCart.map(async (x) => {
    const product = await Product.findById(x._id);
    let quantity;
    if (x.quantity > product.countInStock) {
      quantity = x.qunatity;
      message = "Some of the item(s) have been removed or their quantity has changed due to their inavailability.";
    } else {
      quantity = product.countInStock;
    }
    return quantity
  });

  user.cartItems = updatedCart
  let subTotal = addDecimals(user.cartItems.reduce((acc, item)=>acc+(item.price*item.quantity), 0))
  await user.save()

  res.json({
    success: true,
    cart: updatedCart,
    subTotal
  });
});

exports.clearCart = asyncHandler(async (req, res) => {});
