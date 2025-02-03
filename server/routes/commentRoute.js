const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
	"/myComments",
	authController.protect,
	commentController.getMyComments
);
router.patch("/:id", authController.protect, commentController.updateComment);
router.delete(
	"/:id",
	authController.protect,
	commentController.deleteMyComment
);

module.exports = router;
