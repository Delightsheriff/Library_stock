// const mongoose = require("mongoose");

// //borrower or student schema
// const BorrowedBySchema = new mongoose.Schema({
//   matricNumber: { type: String, required: true },
//   studentDepartment: { type: String, required: true },
//   studentName: { type: String, required: true },
//   returnTime: {
//     type: Date,
//     required: true,
//     default: () => {
//       // Calculate one week from the current date
//       const oneWeekFromNow = new Date();
//       oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
//       return oneWeekFromNow;
//     },
//   },
//   returned: { type: Boolean, default: false },
// });

// const BookSchema = mongoose.Schema({
//   tittle: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   coursecode: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   department: {
//     type: String,
//     required: true,
//   },
//   borrowedBy: BorrowedBySchema,
//   //default image it can be on server or front end but here its on server
//   //   image: {
//   //     type: String,
//   //     default: "uploads/examples.jpeg",
//   //   },
// });

// module.exports = mongoose.model("Book", BookSchema);

const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  publication_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Programming_Languages",
      "Software_Development",
      "Computer_Science",
      "Web_Development",
      "Database_Management",
      "Artificial_Intelligence",
      "Cybersecurity",
      "Computer_Graphics",
      "Networking",
      "Operating_Systems",
    ],
  },
  quantity: {
    type: Number,
    required: true,
  },
  location: String,
});

const Book = model("Book", BookSchema);
module.exports = Book;
