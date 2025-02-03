const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		comment: {
			type: String,
			required: [true, "You haven't commented yet"],
			trim: true,
		},
		owner: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "A comment should have an owner"],
		},
		// References either a Project or a Post
		project: {
			type: mongoose.Schema.ObjectId,
			required: [true, "A comment should belong to a project or post"],
			refPath: "relatedModel", // This refPath allows dynamic referencing
		},
		// Specifies which model (Project or Post) to reference
		relatedModel: {
			type: String,
			required: true,
			enum: ["Project", "Post"], // Limits the options to these models
		},
		likes: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

// Virtual populate to automatically load the related project or post
commentSchema.virtual("on", {
	ref: (doc) => doc.relatedModel, // Dynamically uses relatedModel to determine the reference
	localField: "relatedId",
	foreignField: "_id",
	justOne: true,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
