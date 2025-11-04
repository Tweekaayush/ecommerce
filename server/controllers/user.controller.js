const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");

exports.profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    success: true,
    user,
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password, fullAddress } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    user.password = password;
  }

  if (fullAddress?.address) {
    user.fullAddress.address = fullAddress.address;
    user.fullAddress.city = fullAddress.city;
    user.fullAddress.postalCode = fullAddress.postalCode;
    user.fullAddress.country = fullAddress.country;
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    user: updatedUser,
    message: "User Profile Updated",
  });
});

exports.getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist.product",
  });

  res.json({
    success: true,
    wishlist: user?.wishlist || [],
  });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.json({
    success: true,
    user,
  });
});

exports.getUserListAdmin = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const paginate = 6;
  const userList = await User.find()
    .skip(paginate * (page - 1))
    .limit(paginate);
  const count = await User.countDocuments();
  res.json({
    success: true,
    userList,
    totalPages: Math.ceil(count / paginate),
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { role } = req.body;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = role;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    updatedUser: { ...updatedUser._doc, password: "" },
    message: "User Role Updated!",
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  await User.findByIdAndDelete(id);

  res.json({
    success: true,
    user,
    message: "User deleted",
  });
});

exports.addToWishlist = asyncHandler(async (req, res) => {
  const { product } = req.body;

  const user = await User.findById(req.user._id);

  const existItem = user.wishlist.find((item) => item.product === product);

  if (existItem) {
    res.status(400);
    throw new Error("");
  }

  user.wishlist.push({ product: product });

  const updatedUser = await user.save();

  res.json({
    success: true,
    wishlist: updatedUser.wishlist,
  });
});

exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const { product, message } = req.body;

  const user = await User.findById(req.user._id);

  user.wishlist = user.wishlist.filter(
    (item) => item.product.toString() !== product
  );

  const updatedUser = await user.save();

  res.json({
    success: true,
    wishlist: updatedUser.wishlist,
    message,
  });
});
