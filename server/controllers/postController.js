const Post = require("../models/postModel");
const factory = require("./handlerFactory");

exports.getAllPosts = factory.getAllDocs(Post, "post");
exports.getPost = factory.getDoc(Post, "post", {
	path: "comments",
	select: "-__v",
	options: {
		sort: { updatedAt: -1 },
	},
	populate: {
		path: "owner",
		select: "name _id avatarUrl",
	},
});
exports.getMyPosts = factory.getMyDocs(Post, "post", {
	path: "comments",
	select: "-__v",
	options: {
		sort: { updatedAt: -1 },
	},
	populate: {
		path: "owner",
		select: "name _id avatarUrl",
	},
});
exports.createPost = factory.createOne(Post, "post");
exports.updatePost = factory.updateOne(Post, "post");
exports.deletePost = factory.deleteOne(Post, "post");
exports.likePost = factory.likeDoc(Post, "post");
exports.unlikePost = factory.unlikeDoc(Post, "post");
