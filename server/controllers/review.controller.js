const asyncHandler = require("../middleware/async.middleware");
const Product = require("../models/product.model");
const User = require("../models/user.model");

exports.addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed!");
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((a, c) => a + c.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review added",
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

exports.deleteReview = asyncHandler(async (req, res) => {});
