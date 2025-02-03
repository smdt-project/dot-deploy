process.on("uncaughtException", (err) => {
	console.log(err.name, err.message);
	console.log("UNHANDLED Exception! 💥 Shutting down...");
	process.exit(1);
});

const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const port = process.env.PORT;
const server = app.listen(port, () =>
	console.log("DotCode is running on port" + port + "...")
);

process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message);
	console.log("UNHANDLED REJECTION! 💥Shutting down...");
	server.close(() => process.exit(1));
});
