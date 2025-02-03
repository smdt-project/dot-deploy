const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get(
	"/me",
	authController.protect,
	userController.getMe,
	userController.getUser
);
router.get("/:id", userController.getUser);

router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", authController.protect, userController.deleteMe);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.protect, authController.logout);

router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);
router.patch(
	"/updatePassword",
	authController.protect,
	authController.updatePassword
);

module.exports = router;
