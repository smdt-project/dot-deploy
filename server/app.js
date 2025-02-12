const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const projectRoute = require("./routes/projectRoute");
const userRoute = require("./routes/userRoute");
const latestRoute = require("./routes/latestRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const searchRoute = require("./routes/searchRoute");
const organizationRoute = require("./routes/orgRoute");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser");

const app = express();

// const frontedOrigin = "http://localhost:5173";

// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
      "https://dot-code-nu.vercel.app",
      "https://dot-deploy-front-end1.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
  })
);
// Other middlewares
// Use the CORS middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/api/v1", (req, res, next) => {
  res.send("Hello from the api");
});
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/latest", latestRoute);
app.use("/api/v1/organization", organizationRoute);

// Handle undefined routes
app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} in this server`, 404))
);

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
