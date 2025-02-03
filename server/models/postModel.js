const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["text", "code"],
		required: [true, "the type of the content of a post should be specified"],
	},
	value: { type: String, required: [true, "a post content should have value"] },
	lngName: { type: String },
});

const postSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "a post should have an owner"],
		},
		title: { type: String, required: [true, "a post should have a title"] },
		description: {
			type: String,
			required: [true, "a post should have a description"],
		},
		contents: [contentSchema],
		likes: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		],
		links: [String],
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// add virtual field
postSchema.virtual("comments", {
	ref: "Comment",
	foreignField: "project",
	localField: "_id",
});

postSchema.pre(/^find/, function (next) {
	this.populate({
		path: "owner",
		select: "-__v",
		populate: {
			path: "projects",
			select: "-owner -__v",
		},
	});

	next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
