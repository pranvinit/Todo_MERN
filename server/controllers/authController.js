const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "email already exist" });
  }

  const user = await User.create({ name, email, password });
  const tokenUser = createTokenUser(user);

  // creating JWT token and attaching it to the response
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid Credentials" });
  }
  // Instance method on the user schema
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid Credentials" });
  }
  const tokenUser = createTokenUser(user);
  // creating JWT token and attaching it to the response
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  // setting cookie to some string and expires to Date.now()
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};

module.exports = {
  register,
  login,
  logout,
};
