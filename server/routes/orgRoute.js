const express = require("express");
const authController = require("../controllers/authController");
const orgController = require("../controllers/orgController");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.get("/", authController.protect, orgController.getAllOrganizations);
router.patch(
  "/:orgId",
  authController.protect,
  orgController.updateOrganization
);
router.delete(
  "/:orgId",
  authController.protect,
  orgController.checkForDeletePermission,
  orgController.deleteOrganization
);
router.get(
  "/projects/:orgId",
  authController.protect,
  orgController.checkForPermission,
  orgController.getAllProjects
);

router.get(
  "/project/:orgId/:id",
  authController.protect,
  orgController.checkForPermission,
  orgController.getProject
);
router.post(
  "/project/:orgId",
  authController.protect,
  orgController.checkForPermission,
  orgController.createProject
);
router.patch(
  "/project/:orgId/:id",
  authController.protect,
  orgController.checkForPermission,
  orgController.updateProject
);
router.post(
  "/:orgId/:projectId/comments",
  authController.protect,
  orgController.checkForPermission,
  commentController.setProjectRelatedModel,
  commentController.createComment
);
router.delete(
  "/project/:orgId/:id",
  authController.protect,
  orgController.checkForPermission,
  orgController.checkForDeletePermission,
  orgController.deleteProject
);

router.patch(
  "/like/:orgId/:id",
  authController.protect,
  orgController.checkForPermission,
  orgController.likeProject
);
router.patch(
  "/unlike/:orgId/:id",
  authController.protect,
  orgController.checkForPermission,
  orgController.unlikeProject
);

router.post("/", authController.protect, orgController.createOrganization);
router.post(
  "/:orgId/invitations",
  authController.protect,
  orgController.sendInvitation
);
router.post(
  "/invitations/:invitationToken/:orgId",
  // authController.protect,
  orgController.addMember
);
module.exports = router;
