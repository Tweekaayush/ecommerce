const express = require("express");
const { protected, admin } = require("../middleware/auth.middleware");
const {
  profile,
  updateProfile,
  getUserById,
  deleteUser,
  updateUser,
  getUserListAdmin,
} = require("../controllers/user.controller");

const router = express.Router();

router.route("/profile").get(protected, profile).put(protected, updateProfile);
router.get("/list", protected, admin, getUserListAdmin);
router
  .route("/:id")
  .get(protected, admin, getUserById)
  .delete(protected, admin, deleteUser)
  .put(protected, admin, updateUser);

module.exports = router;
