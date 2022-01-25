const { StatusCodes } = require("http-status-codes");
const { verifyJWT } = require("../utils");

// checks if user is logged in and has a valid jwt token
const authenticateUser = async (req, res, next) => {
  // as we have attached signed cookie
  const token = req.signedCookies.token;
  if (!token) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication Invalid" });
  }
  try {
    // return decoded payload
    const { name, userId } = verifyJWT(token);
    req.user = { name, userId };
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication Invalid" });
  }
};

module.exports = authenticateUser;
