const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const { addReview, deleteReview } = require("../controllers/review.controller");

const router = express.Router();

router.route("/:id").post(protected, addReview).delete(protected, deleteReview);

module.exports = router;
