const Comment = require("../models/commetModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.setPostRelatedModel = (req, res, next) => {
	req.relatedModel = "Post";
	next();
};
exports.setProjectRelatedModel = (req, res, next) => {
	req.relatedModel = "Project";
	next();
};

exports.getMyComments = factory.getMyDocs(Comment, "comment");
exports.createComment = factory.createOne(Comment, "comment");
exports.updateComment = factory.updateOne(Comment, "comment");
exports.deleteMyComment = factory.deleteOne(Comment, "comment");
