const express = require("express");
const projectController = require("../controllers/projectController");
const authController = require("../controllers/authController");
const commentController = require("../controllers/commentController");

const route = express.Router();

route.get("/", projectController.getAllProjects);
route.get(
	"/myProjects",
	authController.protect,
	projectController.getMyProjects
);
route.get("/:id", projectController.getProject);
route.post("/", authController.protect, projectController.createProject);
route.post(
	"/:projectId/comments",
	authController.protect,
	commentController.setProjectRelatedModel,
	commentController.createComment
);

route.patch("/like/:id", authController.protect, projectController.likeProject);
route.patch(
	"/unlike/:id",
	authController.protect,
	projectController.unlikeProject
);

route.patch("/:id", authController.protect, projectController.updateProject);
route.delete("/:id", authController.protect, projectController.deleteProject);

module.exports = route;
