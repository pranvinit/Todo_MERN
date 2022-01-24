const { StatusCodes } = require("http-status-codes");

// overwrites the default express async error handler
const errorHandler = async (err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong");
};

module.exports = errorHandler;
