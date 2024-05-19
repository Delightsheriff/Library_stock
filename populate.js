// const connectDB = require("./db/connect");
require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./src/models/books.model");
const jsonBooks = require("./book_data.json");

const connectDB = (url) => {
  return mongoose.connect(url);
};
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // await // await Product.deleteMany();
    await Book.create(jsonBooks); //create fn\
    console.log("successs");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
