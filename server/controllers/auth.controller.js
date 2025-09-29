const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;

  console.log(req.body);

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists with given email.");
  }

  let uploadResult = ''

  if (image) {
    uploadResult = await cloudinary.uploader.upload(image, {
      folder: "users",
    });
  }

  const newUser = await User.create({
    name,
    email,
    password,
    image: uploadResult?.secure_url || ''
  });

  if (newUser) {
    generateToken(newUser, 201, res);
  } else {
    res.status(401);
    throw new Error("Invalid user credentials");
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
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
