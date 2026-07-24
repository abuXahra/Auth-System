const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connected to db", error.message);
  }
}

module.exports = connectDb;
