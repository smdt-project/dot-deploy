const axios = require("axios");
const dotenv = require("dotenv");
const Project = require("../models/projectModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
  GEMINI_API_KEY;

async function getGeminiSuggestions(oldestCode, currentCode) {
  try {
    const payload = {
      contents: [
        {
          parts: [
            {
              text: ` Assume you are a Senior developer agent and commit message generator like copilot. I won't give you a full code but i will give you the text that's stored as an object in the database. I want you to be very smart in detecting the text's, analysing the code and finally suggesting what's the commit message should be.
				The oldest object that contains the code text is down below:\n${oldestCode}\n\n and the current object that contains the code text is down:\n${currentCode}
				And by seeing what's changed I want you to suggest only one commit message like github copilot do?
				`,
            },
          ],
        },
      ],
    };

    const response = await axios.post(GEMINI_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching suggestions from Gemini API:", error.message);
    throw new Error("Could not get suggestions from Gemini API");
  }
}

exports.suggestCommit = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({
      status: "fail",
      message: "Project not found",
    });
  }

  let sourceCode = req.body.code;

  if (!sourceCode) {
    return res.status(400).json({
      status: "fail",
      message: "Source code is required",
    });
  }
  sourceCode = JSON.stringify(sourceCode);
  let projectCode = JSON.stringify(project.code[0]);

  let suggestions = await getGeminiSuggestions(projectCode, sourceCode);

  suggestions = suggestions.candidates[0].content.parts[0].text.replace(
    /\n/g,
    " "
  );

  return res.status(200).json({
    status: "success",
    data: suggestions,
  });
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
