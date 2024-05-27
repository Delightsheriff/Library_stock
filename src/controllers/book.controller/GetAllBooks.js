const Book = require("../../models/books.model");

module.exports = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ count: books.length, books });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving books" });
  }
};
