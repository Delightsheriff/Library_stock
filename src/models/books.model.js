const mongoose = require("mongoose");

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
  //default image it can be on server or front end but here its on server
  //   image: {
  //     type: String,
  //     default: "uploads/examples.jpeg",
  //   },
});

module.exports = mongoose.model("Book", BookSchema);
