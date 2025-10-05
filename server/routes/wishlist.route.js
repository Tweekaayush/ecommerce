const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", protected, getWishlist);
router.post("/add", protected, addToWishlist);
router.post("/remove", protected, removeFromWishlist);

module.exports = router;
