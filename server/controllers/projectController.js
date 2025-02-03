const Project = require("../models/projectModel");
const factory = require("./handlerFactory");

exports.getAllProjects = factory.getAllDocs(Project, "project", {
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

exports.getProject = factory.getDoc(Project, "project", {
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

exports.getMyProjects = factory.getMyDocs(Project, "project", {
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
exports.createProject = factory.createOne(Project, "project");
exports.updateProject = factory.updateOne(Project, "project");
exports.deleteProject = factory.deleteOne(Project, "project");
exports.likeProject = factory.likeDoc(Project, "project");
exports.unlikeProject = factory.unlikeDoc(Project, "project");
