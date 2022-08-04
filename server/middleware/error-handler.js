const { StatusCodes } = require("http-status-codes");

// overwrites the default express async error handler
const errorHandler = async (err, req, res, next) => {
  console.log(err);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "something went wrong" });
};

module.exports = errorHandler;
