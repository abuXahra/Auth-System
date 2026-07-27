const User = require("../model/user.model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

exports.fetchUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (!users) {
    const error = new Error("Error while fetching users");
    error.statusCode = 500;
    throw error;
  }

  res.status(200).json({ message: "Users retrieved successfuly", users });
});

exports.fetchUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    user: user,
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: req.body },
    { new: true },
  );

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: updatedUser,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
