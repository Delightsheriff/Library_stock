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
