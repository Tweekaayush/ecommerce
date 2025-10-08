const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");
const { generateToken, addToCart } = require("../utils/authUtil");

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, cart } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists with given email.");
  }

  const cartItems = cart.map((item) => {
    return {
      product: item.product._id,
      quantity: item.quantity,
    };
  });

  const newUser = await User.create({
    name,
    email,
    password,
    cartItems,
  });

  if (newUser) {
    generateToken(newUser, 201, res);
  } else {
    res.status(401);
    throw new Error("Invalid user credentials");
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password, cart } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    await addToCart(user, cart);
    generateToken(user, 200, res);
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

exports.logout = asyncHandler(async (req, res) => {
  res
    .cookie("token", null, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now()),
    })
    .status(200)
    .json({
      success: true,
    });
});
