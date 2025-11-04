const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/product.model");
const cloudinary = require("cloudinary");

exports.getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const category = req.query.category ? { category: req.query.category } : {};
  const paginate = 6;

  const count = await Product.countDocuments(category);

  const products = await Product.find(category)
    .limit(paginate)
    .skip((page - 1) * paginate);

  res.json({
    success: true,
    products,
    page,
    totalPages: Math.ceil(count / paginate),
  });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate({
    path: "reviews.user",
    select: "-password",
  });

  res.json({
    success: true,
    product,
  });
});

exports.getProductListAdmin = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const paginate = 6;
  const productList = await Product.find()
    .skip(paginate * (page - 1))
    .limit(paginate)
    .sort({ createdAt: -1 });
  const count = await Product.countDocuments();
  res.json({
    success: true,
    productList,
    totalPages: Math.ceil(count / paginate),
  });
});

exports.getFeaturedProducts = asyncHandler(async (req, res) => {
  const paginate = 8;
  const featuredProducts = await Product.find({ isFeatured: true }).limit(
    paginate
  );

  res.json({
    success: true,
    featuredProducts,
  });
});

exports.getBestSellingProducts = asyncHandler(async (req, res) => {
  const paginate = 8;
  const products = await Product.find({})
    .sort({ numReviews: 1 })
    .limit(paginate);

  res.json({
    success: true,
    products,
  });
});

exports.getRecommendedProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const products = await Product.find({ category }).limit(6);

  res.json({
    success: true,
    recommendedProducts: products,
  });
});

exports.createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    brand,
    category,
    countInStock,
    image,
    isFeatured,
  } = req.body;

  let cloudinaryResponse = null;

  if (image) {
    cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
  }

  let product = null;

  if (cloudinaryResponse) {
    product = await Product.create({
      name,
      price,
      description,
      brand,
      category,
      countInStock,
      isFeatured,
      image: cloudinaryResponse.secure_url,
      user: req.user._id,
      numReviews: 0,
    });

    res.status(201).json({
      success: true,
      product: product,
      message: "Product Created!",
    });
  }
});

exports.deleteProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // if (product?.image) {
  //   const public_id = product.image.split("/").pop().split(".")[0];

  //   if (public_id) await cloudinary.uploader.destroy(`products/${public_id}`);
  // }

  await Product.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Product Deleted",
  });
});

exports.updateProductById = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    brand,
    countInStock,
    category,
    isFeatured,
  } = req.body;

  const { id } = req.params;

  const product = await Product.findById(id);

  let cloudinaryResponse = null;

  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }

  // if (image) {
  //   cloudinaryResponse = cloudinary.uploader.upload(image, {
  //     folder: "products",
  //   });

  //   product.image = cloudinaryResponse?.secure_url;
  // }

  product.name = name;
  product.description = description;
  product.price = price;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;
  product.isFeatured = isFeatured;

  const updatedProduct = await product.save();

  res.json({
    success: true,
    updatedProduct,
    message: "Product Updated",
  });
});

exports.getAllCategories = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  res.json({
    success: true,
    categories,
  });
});
