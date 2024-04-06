const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
