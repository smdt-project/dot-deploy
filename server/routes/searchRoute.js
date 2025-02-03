const express = require("express");
const searchController = require("../controllers/searchController");

const router = express.Router();

router.get("/", searchController.generalSearch);

router.get("/posts", searchController.searchPost);
router.get("/users", searchController.searchUser);
router.get("/projects", searchController.searchProject);

module.exports = router;
