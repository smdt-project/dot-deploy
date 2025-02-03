const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: [true, "Their is a user with this name."],
			required: [true, "A user must have a name"],
			trim: true,
			maxLength: [20, "Name must contain less than 20 characters"],
			minLength: [3, "Name must contain at least 3 characters"],
		},
		email: {
			type: String,
			required: [true, "Please provide your email"],
			unique: [true, "This email has been already in use"],
			lowercase: true,
			validate: [validator.isEmail, "Invalid email format"],
		},
		password: {
			type: String,
			required: [true, "Please enter password"],
			minLength: [6, "Password length must be at least 6"],
			select: false,
		},
		confirmPassword: {
			type: String,
			required: [true, "Please confirm your password"],
			validate: {
				validator: function (el) {
					return el === this.password;
				},
				message: "Password confirmation failed, try again",
			},
		},
		bio: {
			type: String,
			trim: true,
			maxLength: [60, "Bio must contain less than 60 characters"],
			minLength: [3, "Bio must contain at least 3 characters"],
		},
		avatarUrl: String,
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpiresIn: Date,
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// add virtual field
userSchema.virtual("comments", {
	ref: "Comment",
	foreignField: "owner",
	localField: "_id",
});
userSchema.virtual("projects", {
	ref: "Project",
	foreignField: "owner",
	localField: "_id",
});
userSchema.virtual("posts", {
	ref: "Post",
	foreignField: "owner",
	localField: "_id",
});

// a pre middleware to hash password whenever it is been modified
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);

	this.confirmPassword = undefined;
	next();
});

// a pre middleware to update reset time of password
userSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) {
		return next();
	}

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

// a pre middleware to disable selecting disabled(deleted) users
userSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

// an instance method to check if login password is correct
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

// method to check if a user changes there password after issuing a token string
userSchema.methods.passwordChangedAfter = function (jwtTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return jwtTimestamp < changedTimestamp;
	}

	// Password has not been changed yet
	return false;
};

userSchema.methods.createResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
