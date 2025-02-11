const Organization = require("../models/orgModel");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/email");
const Project = require("../models/projectModel");
const factory = require("./handleOrganizationFactory");
const mongoose = require("mongoose");

exports.createOrganization = catchAsync(async (req, res, next) => {
  req.body.members = [];
  req.body.members.push(req.user.id);
  const organization = await Organization.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      organization,
    },
  });
});

// send invitation to the people
exports.sendInvitation = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no email with this email address", 404));
  }
  console.log(" request  params", req.params.orgId);
  //   2) generate a random invitation reset token
  const organization = await Organization.findById(req.params.orgId);
  console.log("organization", organization);
  const invitationToken = await organization.createInvitationToken(user._id);
  await organization.save();

  // send an email
  // 3) send resetting token to user's email
  const invitationLink = `http://localhost:5173/approve-invitation/?teamId=${invitationToken}/?token=${organization._id}`;

  const message = `You have been invited to join ${organization.name}. \n Click down link to join an invitation: ${invitationLink}. \n The link will be valid for only 7 days starting from now. \nIf you did'nt invite you, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: `You have been invited to join ${organization.name}`,
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    console.log(err);
    organization.invitationObj = undefined;
    await organization.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

// add the users to the organization
exports.addMember = catchAsync(async (req, res, next) => {
  const invitationToken = req.params.invitationToken;
  const organizationId = req.params.orgId;
  isAdded = false;
  const organization = await Organization.findById(organizationId);
  console.log("organization", organization);
  if (!organization) {
    return next(new AppError("There is no organization with this id", 404));
  }
  for (let i = 0; i < organization.invitationObj.length; i++) {
    console.log(
      "hello here the token",
      organization.invitationObj[i].invitationToken,
      invitationToken,
      organization.invitationObj[i].invitationToken === invitationToken
    );
    if (
      organization.invitationObj[i].invitationToken === invitationToken &&
      Date.now() < organization.invitationObj[i].expiresIn
    ) {
      isAdded = true;
      organization.members.push(organization.invitationObj[i].id);
      organization.invitationObj.splice(i, 1);
    }
  }
  if (!isAdded) {
    return next(new AppError("There is no invitation with this token", 404));
  }
  await organization.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: " Member added successfully",
  });
});
exports.getAllOrganizations = catchAsync(async (req, res, next) => {
  const organizations = await Organization.find({
    members: { $in: [req.user.id] },
  }).populate("members");
  res.status(200).json({
    status: "success",
    results: organizations.length,
    data: {
      organizations,
    },
  });
});

exports.updateOrganization = catchAsync(async (req, res, next) => {
  const organization = await Organization.findByIdAndUpdate(
    req.params.orgId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      organization,
    },
  });
});

exports.deleteOrganization = catchAsync(async (req, res, next) => {
  await Organization.findByIdAndDelete(req.params.orgId);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.checkForPermission = catchAsync(async (req, res, next) => {
  const organization = await Organization.findById(req.params.orgId);
  if (!organization) {
    res.json({
      status: "fail",
      message: "There is no organization with this id",
    });
    return next(new AppError("There is no organization with this id", 404));
  }
  if (!organization.members.includes(req.user.id)) {
    res.json({
      status: "fail",
      message: "You are not authorized to do this",
    });
    return next(new AppError("You are not authorized to do this", 401));
  }
  req.orgId = req.params.orgId;
  next();
});

exports.checkForDeletePermission = catchAsync(async (req, res, next) => {
  const organization = await Organization.findById(req.params.orgId);
  if (!organization) {
    res.json({
      status: "fail",
      message: "There is no organization with this id",
    });
    return next(new AppError("There is no organization with this id", 404));
  }
  console.log("organization", organization.members[0], req.user.id);
  if (
    !organization.members[0].equals(new mongoose.Types.ObjectId(req.user.id))
  ) {
    res.json({
      status: "fail",
      message: "You are not authorized to do this",
    });
    return next(new AppError("You are not authorized to do this", 401));
  }
  req.orgId = req.params.orgId;
  next();
});

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
