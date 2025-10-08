const jwt = require("jsonwebtoken");
const Product = require("../models/product.model");
const User = require("../models/user.model");

exports.generateToken = (user, statusCode, res) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const options = {
    sameSite: "strict",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user: { ...user._doc, password: null },
    });
};

exports.addToCart = async (user, cart) => {

  cart.forEach(async (item) => {
    const product = await Product.findById(item.product._id);
    const existItem = user.cartItems.find(
      (x) => x.product.toString() === item.product._id.toString()
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

      user.cartItems = [
        ...cartItems,
        { product: item.product._id, itemQuantity },
      ];
    }

    await user.save();
  });
};
