const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLenth: 50,
    },

    middleName: {
      type: String,
      required: false,
      minLength: 1,
      maxLenth: 50,
    },

    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLenth: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },

    age: {
      type: Number,
      required: true,
      min: 1,
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 128,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", userSchema);
module.exports = User;
