const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/product.model");
const User = require("../models/user.model");

exports.getCartItems = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);
  user.cartItems = await Array.fromAsync(
    user.cartItems.map(async (item) => {
      const product = await Product.findById(item.product);
      if (product.countInStock < item.quantity) {
        if (product.countInStock > 0) {
          message = "Some items in your cart have changed quantity";
          return { ...item, quantity: product.countInStock };
        }
      } else {
        return item;
      }
    })
  );

  user = await user.save();

  user = await User.populate(user, {
    path: "cartItems.product",
    select: "name brand image brand price",
  });

  res.json({
    success: true,
    cartItems: user.cartItems,
  });
});

exports.addToCart = asyncHandler(async (req, res) => {
  const { userId, item } = req.body;

  const product = await Product.findById(item._id);
  const user = await User.findById(userId);

  const existItem = user.cartItems.find(
    (x) => x.product.toString() === item._id.toString()
  );
  let cartItems = user.cartItems;

  if (existItem) {
    user.cartItems = user.cartItems.map((x) =>
      x.product.toString() === existItem.product.toString()
        ? {
            ...x,
            quantity:
              x.quantity + item.quantity > product.countInStock
                ? product.countInStock
                : x.quantity + item.quantity,
          }
        : x
    );
  } else {
    let itemQuantity =
      item.quantity >= product.countInStock ? product.countInStock : item;

    user.cartItems = [...cartItems, { product: item._id, itemQuantity }];
  }

  await user.save();

  const updatedUser = await User.findById(userId).populate({
    path: "cartItems.product",
    select: "name brand image brand price",
  });

  res.json({
    success: true,
    cartItems: updatedUser.cartItems,
  });
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  const user = await User.findById(userId);

  user.cartItems = user.cartItems.filter(
    (x) => x.product._id.toString() !== productId.toString()
  );

  await user.save();

  const updatedUser = await User.findById(userId).populate({
    path: "cartItems.product",
    select: "name brand price image brand",
  });

  res.json({
    success: true,
    cartItems: updatedUser.cartItems,
  });
});

exports.updateQuantity = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const user = await User.findById(userId);

  const product = await Product.findById(productId);

  if (quantity) {
    if (quantity > product.countInStock) {
      res.status(400);
      throw new Error("You cannot add more of this item in your cart");
    }
    user.cartItems = user.cartItems.map((x) =>
      x.product._id.toString() === productId.toString()
        ? { ...x, quantity: quantity }
        : x
    );
  } else {
    user.cartItems = user.cartItems.filter(
      (x) => x.product._id.toString() !== productId.toString()
    );
  }

  await user.save();

  const updatedUser = await User.findById(userId).populate({
    path: "cartItems.product",
    select: "name brand price image brand",
  });

  res.json({
    success: true,
    cartItems: updatedUser.cartItems,
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
      message =
        "Some of the item(s) have been removed or their quantity has changed due to their inavailability.";
    } else {
      quantity = product.countInStock;
    }
    return quantity;
  });

  user.cartItems = updatedCart;
  let subTotal = addDecimals(
    user.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  await user.save();

  res.json({
    success: true,
    cart: updatedCart,
    subTotal,
  });
});

exports.clearCart = asyncHandler(async (req, res) => {});
