const express = require("express");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/myPosts", authController.protect, postController.getMyPosts);
router.get("/:id", postController.getPost);

router.post("/", authController.protect, postController.createPost);
router.post(
	"/:projectId/comments",
	authController.protect,
	commentController.setPostRelatedModel,
	commentController.createComment
);

router.patch("/like/:id", authController.protect, postController.likePost);
router.patch("/unlike/:id", authController.protect, postController.unlikePost);

router.patch("/:id", authController.protect, postController.updatePost);
router.delete("/:id", authController.protect, postController.deletePost);

module.exports = router;
