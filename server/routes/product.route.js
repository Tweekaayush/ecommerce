const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const { admin } = require("../middleware/auth.middleware");
const {
  createProduct,
  getProducts,
  updateProductById,
  deleteProductById,
  getProductById,
  getRecommendedProducts,
  getFeaturedProducts,
  getAllCategories,
  getBestSellingProducts,
  getProductListAdmin,
} = require("../controllers/product.controller");

const router = express.Router();

router.route("/").get(getProducts).post(protected, admin, createProduct);
router.get("/recommended", getRecommendedProducts);
router.get("/featured", getFeaturedProducts);
router.get("/bestseller", getBestSellingProducts);
router.get("/categories", getAllCategories);
router.get("/list", protected, admin, getProductListAdmin);
router
  .route("/:id")
  .get(getProductById)
  .delete(protected, admin, deleteProductById)
  .put(protected, admin, updateProductById);

module.exports = router;
