const Comment = require("../models/commetModel");
const APIFeatures = require("../utils/APIFeatures");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Unlike a project
exports.unlikeDoc = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    const docId = req.params.id;
    const userId = req.orgId;

    const doc = await Model.findById(docId);
    if (!doc) {
      return next(new AppError(`${docName} not found`, 404));
    }

    if (!doc.likes.includes(userId)) {
      return next(new AppError(`User has no liked this ${docName}`, 400));
    }

    // Remove the user from the likes array
    doc.likes = doc.likes.filter((id) => id.toString() !== userId.toString());
    await doc.save();

    res.status(200).json({
      status: "success",
      message: `${docName}  ${
        docName === "project" ? "unstarred" : "unliked"
      } successfully`,
    });
  });

exports.likeDoc = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    const docId = req.params.id;
    const userId = req.orgId;

    // Check if the user has already liked the project
    const doc = await Model.findById(docId);

    if (!doc) {
      return next(new AppError(`${docName} not found`, 404));
    }

    if (doc.likes.includes(userId)) {
      return next(new AppError(`User has already liked this ${docName}`, 400));
    }

    // Add the user to the likes array
    doc.likes.push(userId);
    await doc.save();

    res.status(200).json({
      status: "success",
      message: `${docName}  ${
        docName === "project" ? "starred" : "liked"
      } successfully`,
    });
  });

exports.searchDocs = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(req.searchQuery), req.query)
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;
    if (docs.length === 0) {
      return next(
        new AppError(`No ${docName} found matching '${req.query.q}'`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        docs,
      },
    });
  });

exports.getAllDocs = (Model, docName, populateOptions) =>
  catchAsync(async (req, res) => {
    // BUILD QUERY
    const features = new APIFeatures(
      Model.find({ owner: req.orgId }).populate(populateOptions),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // EXECUTE QUERY
    const docs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      docs: docs.length,
      data: {
        docs,
      },
    });
  });

exports.getDoc = (Model, docName, populateOptions) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let query = Model.findById(id);

    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError(`No ${docName} is found`, 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.getMyDocs = (Model, docName, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find({ owner: req.orgId });

    if (populateOptions) query = query.populate(populateOptions);

    const docs = await query;

    res.status(200).json({
      status: "success",
      docs: docs.length,
      data: {
        docs,
      },
    });
  });

exports.createOne = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    if (req.body.code) {
      req.body.code.version = 1;
    }
    const doc = await Model.create({
      ...req.body,
      owner: req.orgId,
      project: req.params.projectId,
      relatedModel: req.relatedModel,
    });

    res.status(200).json({
      status: "success",
      doc,
    });
  });

exports.updateOne = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    requestBody = req.body;
    code = requestBody?.code;
    let doc = await Model.findById(req.params.id);
    if (code) {
      if (doc.code.length > 0) {
        code.version = doc.code[0]?.version + 1;
      } else {
        code.version = 1;
      }
      if (code) {
        doc.code.unshift(code);
        requestBody.code = doc.code;
      }
    }

    if (!doc) {
      return next(new AppError(`No ${docName} found to update`, 404));
    }

    const updatedDoc = await Model.findByIdAndUpdate(
      req.params.id,
      requestBody,
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      updatedDoc,
    });
  });

exports.deleteOne = (Model, docName) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let doc = await Model.findById(id);

    if (!doc) {
      return next(new AppError(`No ${docName} is found`, 404));
    }

    // delete all comments related to a project or a post
    if (docName === "project" || docName === "post") {
      await Comment.deleteMany({ project: doc._id });
    }

    doc = await Model.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
