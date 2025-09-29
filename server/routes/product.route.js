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
} = require("../controllers/product.controller");

const router = express.Router();

router.route("/").get(getProducts).post(protected, admin, createProduct);
router.get("/recommended", getRecommendedProducts);
router.get("/featured", getFeaturedProducts);
router.get('/categories', getAllCategories)
router
  .route("/:id")
  .get(getProductById)
  .delete(protected, admin, deleteProductById)
  .put(protected, admin, updateProductById);

module.exports = router;
