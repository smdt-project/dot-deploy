const Post = require("../models/postModel");
const Project = require("../models/projectModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getLatests = catchAsync(async (req, res, next) => {
	const projects = await Project.find()
		.populate({
			path: "comments",
			select: "-__v",
			populate: {
				path: "owner",
				select: "name _id avatarUrl",
			},
		})
		.sort("-updatedAt")
		.limit(15);

	const posts = await Post.find()
		.populate({
			path: "comments",
			select: "-__v",
			populate: {
				path: "owner",
				select: "name _id avatarUrl",
			},
		})
		.sort("-updatedAt")
		.limit(15);

	// Combine and sort the results
	const latests = [...projects, ...posts].sort((a, b) => {
		return new Date(b.updatedAt) - new Date(a.updatedAt);
	});

	// Limit to the top 15 items
	res.status(200).json({
		status: "success",
		data: {
			latests,
		},
	});
});
