const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);

	// const cookieOptions = {
	// 	expires: new Date(
	// 		Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
	// 	),
	// 	httpOnly: true,
	// 	secure: process.env.NODE_ENV === "production",
	// 	sameSite: "None",
	// };

	// res.cookie("jwt", token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

exports.signup = catchAsync(async (req, res) => {
	const newUser = await User.create({
		name: req.body.name,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		email: req.body.email,
	});

	createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError("Please provide email and password", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new AppError("There is no user with this email", 401));
	}

	const isPasswordMatch = await user.correctPassword(password, user.password);

	if (!isPasswordMatch) {
		return next(
			new AppError("you have entered wrong password, please try again", 401)
		);
	}

	// If everything is okay, send token to client
	createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
	// clear jwt from the cookies
	res.clearCookie("jwt");
	// response with success
	res.status(200).json({
		status: "success",
		message: "Logged out successfully",
	});
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) check token if it is in the header and if it is extract it

	let token = "";
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies && req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(new AppError("No token is found!", 401));
	}

	// 2) token verification

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if user still exists
	const freshUser = await User.findById(decoded.id);
	if (!freshUser) {
		return next(
			new AppError("The user belonging to this token does no exist", 401)
		);
	}

	// 3) Check if user changed password after the token was issued
	const isPasswordChangedAfter = await freshUser.passwordChangedAfter(
		decoded.iat
	);

	if (isPasswordChangedAfter) {
		return next(new AppError("Password changed, please login again"));
	}

	// GRANT ACCESS TO THE PROTECTED USER
	req.user = freshUser;
	next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
	// 1) check if the requesting user exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError("There is no email with this email address", 404));
	}
	// 2) generate a random resetting token
	const resetToken = await user.createResetPasswordToken();
	await user.save({ validateBeforeSave: false });

	// 3) send resetting token to user's email
	const resetURL = `${req.protocol}://${req.get(
		"host"
	)}/api/v1/users/resetPassword/${resetToken}`;

	const message = `Forgot you password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}. \nIf you did'nt forget your password, please ignore this email!`;
	try {
		await sendEmail({
			email: user.email,
			subject: "Your password reset token (valid for 10 minutes)",
			message,
		});

		res.status(200).json({
			status: "success",
			message: "Token sent to email",
		});
	} catch (err) {
		console.log(err);
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });

		return next(
			new AppError("There was an error sending the email. Try again later!"),
			500
		);
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	// 1) Get user base on the token params from the req
	const resetToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: resetToken,
		passwordResetExpiresIn: { $gt: Date.now() },
	});
	// 2) If token has not expired and there is user ith this token, reset password

	if (!user) {
		return next(new AppError("Token is invalid or has expired"));
	}

	user.password = req.body.password;
	user.confirmPassword = req.body.confirmPassword;
	user.passwordResetToken = undefined;
	user.passwordResetExpiresIn = undefined;
	await user.save();

	// 3) Update changedPasswordAt property for the user (using pre middleware)
	// 4) Log the user in, send jwt
	createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	// 1) get user by the token
	const user = await User.findById(req.user.id).select("+password");
	// 2) authenticate the user with old password
	const isCorrectPassword = await user.correctPassword(
		req.body.currPassword,
		user.password
	);
	if (!isCorrectPassword) {
		return next(new AppError("Your current password is wrong", 401));
	}
	// 3) If so, update password
	user.password = req.body.newPassword;
	user.confirmPassword = req.body.newPassword;
	await user.save();
	// 4) logged user in with the new jwt
	createSendToken(user, 200, res);
});
