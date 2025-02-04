const express = require("express");
const authController = require("../controllers/authController");
const orgController = require("../controllers/orgController");

const router = express.Router();

router.post("/", authController.protect, orgController.createOrganization);
router.post(
  "/:orgId/invitations",
  authController.protect,
  orgController.sendInvitation
);
router.post(
  "/invitations/:invitationToken/:orgId",
  authController.protect,
  orgController.addMember
);
module.exports = router;
