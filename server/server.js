const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const couponRoute = require("./routes/coupon.route");
const cartRoute = require("./routes/cart.route");
const paymentRoute = require("./routes/payment.route");
const analyticsRoute = require("./routes/analytics.route");
const orderRoute = require("./routes/order.route");
const wishlistRoute = require("./routes/wishlist.route");
const reviewRoute = require("./routes/review.route");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const path = require("path");

const app = express();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({limit: '10mb'}));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/coupon", couponRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/analytics", analyticsRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/review", reviewRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json("Server Running");
  });
}


// Error Middleware

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, (req, res) => {
  console.log("Server running on port:", process.env.PORT);
});
