const AppError = require("../utils/AppError");

const handleCastErrorDB = (error) => {
	const message = `Invalid ${error.path}: ${error.value}`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (error) => {
	const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `${value} has been already in use, please use another value`;
	return new AppError(message, 400);
};

const handleValidatorErrorDB = (error) => {
	const errMsgs = Object.values(error.errors).map((err) => err.message)[0];

	const message = `Invalid Data: ${errMsgs}`;
	return new AppError(message, 400);
};

const handleJsonWebTokenError = () =>
	new AppError("Invalid token string, please login again", 401);
const handleTokenExpiredError = () =>
	new AppError("You token has expired, please login again", 401);

const sendDevErr = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		err: err,
		stack: err.stack,
	});
};

const sendProdErr = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		res.status(500).json({
			status: "Error",
			message: "Something went wrong",
		});
	}
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendDevErr(err, res);
	} else if (process.env.NODE_ENV === "production") {
		let error = { ...err };
		error.name = err.name;
		error.errmsg = err.errmsg;
		error.errors = err.errors;

		if (error.name === "CastError") error = handleCastErrorDB(error);
		if (error.code === 11000) error = handleDuplicateFieldsDB(error);
		if (error.name === "ValidationError") error = handleValidatorErrorDB(error);
		if (error.name === "JsonWebTokenError") error = handleJsonWebTokenError();
		if (error.name === "TokenExpiredError") error = handleTokenExpiredError();

		sendProdErr(error, res);
	}
};
