const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const factory = require("../controllers/handlerFactory");

const filterObj = (obj, allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) {
			newObj[el] = obj[el];
		}
	});

	return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
	const users = await User.find();

	res.status(200).json({
		status: "success",
		by: req.user,
		users: users.length,
		data: {
			users,
		},
	});
});

exports.getUser = factory.getDoc(User, "user", [
	{
		path: "comments",
		select: "-__v",
		populate: {
			path: "project",
			populate: {
				path: "comments",
				select: "_id",
			},
		},
	},
	{
		path: "projects",
		select: "-__v",
		populate: {
			path: "comments",
			populate: {
				path: "owner",
				select: "_id avatarUrl name",
			},
		},
	},
	{
		path: "posts",
		select: "-__v",
		populate: {
			path: "comments",
			populate: {
				path: "owner",
				select: "_id avatarUrl name",
			},
		},
	},
]);

exports.getMe = (req, res, next) => {
	req.params.id = req.user.id;
	next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
	// 1) Create error if user POSTs password data
	if (req.body.password || req.body.confirmPassword) {
		return next(
			new AppError(
				"This route is not to update password, use /updatePassword route instead.",
				400
			)
		);
	}

	// 2) Filtered out unwanted field names that are not allowed to be updated
	const filteredBody = filterObj(req.body, "name email avatarUrl");

	// 3) update user document
	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: "success",
		data: {
			updatedUser,
		},
	});
});

exports.deleteMe = catchAsync(async (req, res) => {
	const inActivatedUser = await User.findByIdAndUpdate(req.user.id, {
		active: false,
	});

	res.status(204).json({
		status: "success",
		data: null,
	});
});
