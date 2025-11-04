const jwt = require("jsonwebtoken");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const asyncHandler = require("../middleware/asyncHandler");
const nodeMailer = require('nodemailer')

exports.generateToken = (user, statusCode, res) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const options = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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

exports.sendPasswordResetLink = (user) => {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET + user.password,
    {
      expiresIn: "10m",
    }
  );

  return `${process.env.CLIENT_URL}/password/reset?token=${token}&user=${user._id}`;
};

exports.verifyReceivedToken = (user, token) => {
  const verify = jwt.verify(token, process.env.JWT_SECRET + user.password);
  return verify;
};

exports.sendEmail = asyncHandler(async(options)=>{
    const transporter = nodeMailer.createTransport({
        host:process.env.SMTP_HOST,
        port:465,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    }

    await transporter.sendMail(mailOptions);
})
