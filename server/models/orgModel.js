const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An organization must have a name"],
      unique: true,
      trim: true,
      minLength: [3, "organization should contain at least 3 characters"],
      maxLength: [60, "organization should contain less than 30 characters"],
    },
    description: {
      type: String,
      required: [true, "organization must have type"],
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "members of a project should be specified"],
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Organization = mongoose.model("Organization", orgSchema);

module.exports = Organization;
