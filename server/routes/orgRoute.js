const express = require("express");
const authController = require("../controllers/authController");
const orgController = require("../controllers/orgController");

const router = express.Router();

router.post("/", authController.protect, orgController.createPosts);

module.exports = router;
