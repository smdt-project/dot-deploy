const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const DB_URL = process.env.DATABASE;
connectDB = async () => {
	try {
		await mongoose.connect(DB_URL);
		console.log("database is connected successfully!");
	} catch (error) {
		console.log(
			"something happened while trying to connect with database : " + error
		);
		process.exit(1);
	}
};

module.exports = connectDB;
