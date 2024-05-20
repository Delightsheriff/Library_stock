const mongoose = require("mongoose");

//borrower or student schema
const BorrowedBySchema = new mongoose.Schema({
  matricNumber: { type: String, required: true },
  studentDepartment: { type: String, required: true },
  studentName: { type: String, required: true },
  returnTime: { type: Date, required: true },
  returned: { type: Boolean, default: false },
});

const BookSchema = mongoose.Schema({
  tittle: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coursecode: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  borrowedBy: BorrowedBySchema,
  //default image it can be on server or front end but here its on server
  //   image: {
  //     type: String,
  //     default: "uploads/examples.jpeg",
  //   },
});

module.exports = mongoose.model("Book", BookSchema);
