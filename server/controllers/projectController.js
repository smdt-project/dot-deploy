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

const getOpenRouterApiKey= function(){
  return process.env.OPENROUTER_API_KEY;
}

async function getGeminiSuggestions(oldestCode, currentCode) {
  try {
    const payload = {
      contents: [
        {
          parts: [
            {
              text: ` Assume you are a Senior developer agent and commit message generator like copilot. I won't give you a full code but i will give you the text that's stored as an object in the database. I want you to be very smart in detecting the text's, analysing the code and finally suggesting what's the commit message should be.
				The oldest object that contains the code text is down below:\n${oldestCode}\n\n and the current object that contains the code text is down:\n${currentCode}
				And by seeing what's changed I want you to give me only maximum of 7 words of one commit message like github copilot do? Don't say any other explanation and text I want a maximum of 7 words commit message.
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


const AI_MODELS = {
  "Gemini 2.0 Flash": "google/gemini-2.0-flash-001",
  "Mistral 7B Instruct": "mistralai/mistral-7b-instruct:free",
  "Qwen 2.5 Coder 32B Instruct": "qwen/qwen-2.5-coder-32b-instruct",
  "Microsoft Phi-3 Medium 128K Instruct":
    "microsoft/phi-3-medium-128k-instruct:free",
  "Meta Llama 3 8B Instruct": "meta-llama/llama-3-8b-instruct:free",
  "OpenChat 3.5 7B": "openchat/openchat-7b:free",
  "Microsoft Phi-3 Mini 128K Instruct":
    "microsoft/phi-3-mini-128k-instruct:free",
  "DeepSeek-R1": "deepseek/deepseek-r1:free",
  };
const getSelectedModel= (selectedModel)=>{
  return AI_MODELS[selectedModel];
}

exports.findBug= catchAsync(async function(req, res, next) {
  const openRouterAPIKey= getOpenRouterApiKey();
  const selectedModel= getSelectedModel(req.body.selectedModel);
  const originalContent= req.body.code;
  const language= req.body.language;
  console.log('openRouterAPIKey', openRouterAPIKey, 'selectedModel', selectedModel, 'originalContent', originalContent, 'language', language);
  const prompt = `You are a senior software engineer specialized in identifying bugs and code issues. Analyze the provided code that contains ${language} and identify all potential bugs, errors, and vulnerabilities.

                    - Identify any syntax errors, logic flaws, and runtime exceptions
                    - Detect inconsistent variable usage and undefined references
                    - Flag potential security vulnerabilities and performance bottlenecks
                    - Identify improper error handling and edge cases
                    - Check for memory leaks and resource management issues
                    - Analyze asynchronous code for potential race conditions
                    
                    For each bug found, provide:
                    1. A brief description of the issue
                    2. The specific location in the code
                    3. The severity (Critical, High, Medium, Low)
                    4. A recommended fix with code examples

                    <code-to-analyze>
                    ${originalContent}
                    </code-to-analyze>

                    Respond with a structured analysis of all bugs found, ordered by severity. Include code snippets showing the recommended fixes.`;


  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterAPIKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.1,
          max_tokens: 2000,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    res.json({
      "message": "success",
      "data": content
    });
  } catch (error) {
    console.log('error', error)
    res.json({
      "message": "error",
      "data": error.message
    })
  }
}
)

exports.chat= catchAsync(async function(req, res, next) {
  const openRouterAPIKey= getOpenRouterApiKey();
  const selectedModel= getSelectedModel(req.body.selectedModel);
  const editor_code= req.body.code;
  const language= req.body.language;
  const userQuestion= req.body.question;
  const prompt = `As a senior software developer, answer the user's question about this ${language} code:
    <code>
    ${editor_code}
    </code>

    <user-question>
    ${userQuestion}
    </user-question>
    If the user is providing a code snippet in the user question, please explain it according to the above code and also tell the user what does it mean, give a solution.
    Provide a detailed response that:
    1. Directly addresses the specific question asked
    2. Explains relevant concepts and principles
    3. ALWAYS includes complete, working code implementation
    4. Makes the code easily adaptable to the user's needs

    Your response must include:
    - Clear explanation of the solution approach
    - Well-commented, production-ready code
    - Complete implementation that solves the user's problem
    - Consideration of edge cases and performance

    Be thorough in your explanation but prioritize providing functional code that the user can immediately implement. Format code with proper indentation and follow ${language} best practices.`;
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterAPIKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.1,
          max_tokens: 2000,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    res.json({
      "message": "success",
      "data": content
    });
  } catch (error) {
    console.log('error', error)
    res.json({
      "message": "error",
      "data": error.message
    })
  }
}
)

exports.autoCompletion= catchAsync(async function(req, res, next) {
  const openRouterAPIKey= getOpenRouterApiKey();
  const selectedModel= getSelectedModel(req.body.selectedModel);
  const partialCode= req.body.code;
  const language= req.body.language;
  const prompt = `Given the following partial ${language} code, continue writing the most logical and natural completion:
      <existing-code>
      ${partialCode}
      </existing-code>
      Continue the code by:
      1. Maintaining the same style, naming conventions, and patterns
      2. Completing the current structure, function, or block
      3. Following idiomatic ${language} practices
      4. Ensuring the completed code is syntactically valid
      5. Inferring the intended functionality from context
      6. Including appropriate error handling where necessary
      7. Adding comments only when they clarify complex logic

      The code completion should feel like a seamless extension of what the user has already written. Do not explain or discuss the code - simply provide the natural continuation starting from where the user's code ends.`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterAPIKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.1,
          max_tokens: 2000,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    res.json({
      "message": "success",
      "data": content
    });
  } catch (error) {
    console.log('error', error)
    res.json({
      "message": "error",
      "data": error.message
    })
  }
}
)

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
