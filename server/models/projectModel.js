const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A project must have a name"],
			unique: true,
			trim: true,
			minLength: [3, "name should contain at least 3 characters"],
			maxLength: [60, "name should contain less than 30 characters"],
		},
		type: {
			type: String,
			required: [true, "project must have type"],
			enum: {
				values: ["ui", "snippet"],
				message: "a project is either ui or snippet",
			},
		},
		lngName: {
			type: String,
			default: "javascript",
		},
		code: {
			type: {},
			required: [true, "a project should have a code"],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		description: {
			type: String,
		},
		tags: [String],
		owner: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "owner of a project should be specified"],
		},
		likes: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		],
		visibility: {
			type: String,
			enum: {
				values: ["public", "private"],
				message: "Visibility should be either private or public",
			},
			default: "public",
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
// add virtual field
projectSchema.virtual("comments", {
	ref: "Comment",
	foreignField: "project",
	localField: "_id",
});

// enable reading only publics
projectSchema.pre(/^find/, function (next) {
	this.find({ visibility: { $ne: "private" } });
	next();
});

// populate owner data for any find queries
projectSchema.pre(/^find/, function (next) {
	this.populate({
		path: "owner",
		select: "-__v -passwordChangedAt",
	});
	next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
