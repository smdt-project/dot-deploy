const mongoose = require("mongoose");
const crypto = require("crypto");

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
      required: [true, "organization must have a description"],
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "members of a project should be specified"],
      },
    ],
    invitationObj: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
orgSchema.methods.createInvitationToken = function (id) {
  const invitationToken = crypto.randomBytes(32).toString("hex");

  let expiresIn = Date.now() + 7 * 24 * 60 * 60 * 1000;
  obj = {
    invitationToken,
    id,
    expiresIn,
  };
  this.invitationObj.push(obj);

  return invitationToken;
};
const Organization = mongoose.model("Organization", orgSchema);

module.exports = Organization;
