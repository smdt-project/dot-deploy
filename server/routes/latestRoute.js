const express = require("express");
const latestController = require("../controllers/latestController");
const router = express.Router();

router.get("/", latestController.getLatests);

module.exports = router;
