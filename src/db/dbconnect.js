require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URL}`)
    console.log('mongodb connected ||');
  } catch (error) {
    console.log("mongodb connection error", error);
    process.exit(1);
  }
};

module.exports = connectDB;