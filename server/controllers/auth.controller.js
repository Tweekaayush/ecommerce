const asyncHandler = require("../middleware/async.middleware");
const User = require("../models/user.model");
const {
  generateToken,
  addToCart,
  sendPasswordResetLink,
  verifyReceivedToken,
  sendEmail,
} = require("../utils/auth.util");

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
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now()),
    })
    .status(200)
    .json({
      success: true,
    });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  const resetPasswordUrl = sendPasswordResetLink(user);

  const message = `Your password reset link is \n\n ${resetPasswordUrl} \n\n, If you have not requested this Email then, please ignore it`;
  await sendEmail({
    email: user.email,
    subject: "Primart Password Recovery",
    message,
  });
  res.status(200).json({
    success: true,
    message: `Email sent to ${user.email} successfully`,
  });
});
exports.resetPassword = asyncHandler(async (req, res) => {
  const { password, user: id, token } = req.body;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  const verify = verifyReceivedToken(user, token);

  if (verify) {
    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } else {
    res.status(404);
    throw new Error("Invalid request");
  }
});
