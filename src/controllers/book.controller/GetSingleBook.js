const Book = require("../../models/books.model");

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ msg: "Found it", book });
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
};
