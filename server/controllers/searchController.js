const Post = require("../models/postModel");
const Project = require("../models/projectModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

const hasQuery = (q, next) => {
	if (!q) next(new AppError("please provide a search query", 401));
};

exports.setPostSearchQuery = (req, res, next) => {
	let { q } = req.query;
	hasQuery(q, next);

	req.searchQuery = {
		$or: [
			{ title: { $regex: q, $options: "i" } },
			{ description: { $regex: q, $options: "i" } },
			{ tags: { $regex: q, $options: "i" } },
		],
	};
	next();
};

exports.setUserSearchQuery = (req, res, next) => {
	hasQuery(req.query.q, next);

	req.searchQuery = {
		name: { $regex: req.query.q, $options: "i" },
	};
	next();
};

exports.setProjectSearchQuery = (req, res, next) => {
	hasQuery(req.query.q, next);

	let query = {
		$or: [
			{ name: { $regex: req.query.q, $options: "i" } },
			{ description: { $regex: req.query.q, $options: "i" } },
			{ tags: { $regex: q, $options: "i" } },
		],
	};

	if (req.query.type) query.type = req.query.type;
	req.searchQuery = query;
	next();
};

exports.generalSearch = catchAsync(async (req, res, next) => {
	const { q } = req.query;
	hasQuery(q);

	const [users, projects, posts] = await Promise.all([
		User.find({
			name: { $regex: req.query.q, $options: "i" },
		}),
		Project.find({
			$or: [
				{ name: { $regex: req.query.q, $options: "i" } },
				{ description: { $regex: req.query.q, $options: "i" } },
				{ tags: { $regex: q, $options: "i" } },
			],
		})
			.populate("owner")
			.populate({
				path: "comments",
				select: "_id",
			}),
		Post.find({
			$or: [
				{ title: { $regex: q, $options: "i" } },
				{ description: { $regex: q, $options: "i" } },
			],
		})
			.populate("owner")
			.populate({
				path: "comments",
				select: "_id",
			}),
	]);

	const results = users.length + projects.length + posts.length;

	res.status(200).json({
		status: "success",
		results,
		data: {
			projects,
			posts,
			users,
		},
	});
});

exports.searchPost = catchAsync(async (req, res, next) => {
	const { q } = req.query;
	hasQuery(q);

	const docs = await Post.find({
		$or: [
			{ title: { $regex: q, $options: "i" } },
			{ description: { $regex: q, $options: "i" } },
			{ tags: { $regex: q, $options: "i" } },
		],
	})
		.populate("owner")
		.populate({
			path: "comments",
			select: "_id",
		});

	res.status(200).json({
		status: "success",
		results: docs.length,
		data: {
			docs,
		},
	});
});

exports.searchUser = catchAsync(async (req, res, next) => {
	const { q } = req.query;
	hasQuery(q);

	const docs = await User.find({
		name: { $regex: req.query.q, $options: "i" },
	});

	res.status(200).json({
		status: "success",
		results: docs.length,
		data: {
			docs,
		},
	});
});
exports.searchProject = catchAsync(async (req, res, next) => {
	const { q, type } = req.query;
	hasQuery(q);

	const filterQ = type
		? {
				$or: [
					{ name: { $regex: req.query.q, $options: "i" } },
					{ description: { $regex: req.query.q, $options: "i" } },
					{ tags: { $regex: q, $options: "i" } },
				],
				type: type,
		  }
		: {
				$or: [
					{ name: { $regex: req.query.q, $options: "i" } },
					{ description: { $regex: req.query.q, $options: "i" } },
					{ tags: { $regex: q, $options: "i" } },
				],
		  };

	const docs = await Project.find(filterQ).populate("owner").populate({
		path: "comments",
		select: "_id",
	});

	res.status(200).json({
		status: "success",
		results: docs.length,
		data: {
			docs,
		},
	});
});
