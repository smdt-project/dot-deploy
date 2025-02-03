const Organization = require("../models/orgModel");
const catchAsync = require("../utils/catchAsync");

exports.createPosts = catchAsync(async (req, res, next) => {
  req.body.members = [];
  req.body.members.push(req.user.id);
  console.log("req.body", req.body);
  const organization = await Organization.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      organization,
    },
  });
});
