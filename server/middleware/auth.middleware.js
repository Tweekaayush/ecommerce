const asyncHandler = require("./async.middleware");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.protected = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new Error("Please login to access this resource"));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeData._id).select("-password");

  next();
});

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(new Error("Not Authorized"));
  }
};
