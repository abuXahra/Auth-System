const User = require("../model/user.model");
const userController = require("../model/user.model");
const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = AsyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    gender,
    age,
    password,
  } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }

  //   hashpassword
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    middleName,
    lastName,
    email,
    phone,
    gender,
    age,
    password: hashPassword,
  });

  if (!user) {
    const error = new Error("Error occured while creating user");
    error.status = 500;
    throw error;
  }

  const accessToken = await jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "30m" },
  );

  const refreshToken = await jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" },
  );

  res.status(201).json({
    message: "User registration successful",
    succes: true,
    data: { accessToken: accessToken, refreshToken: refreshToken, user: user },
  });
});

exports.login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new Error("Email does not exist");
    error.statusCode = 400;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Password or Email is incorrect");
    error.statusCode = 400;
    throw error;
  }

  const accessToken = await jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "30m" },
  );

  const refreshToken = await jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" },
  );

  res.status(200).json({
    message: "User login successful",
    succes: true,
    data: { accessToken: accessToken, refreshToken: refreshToken, user: user },
  });
});

exports.logout = AsyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
