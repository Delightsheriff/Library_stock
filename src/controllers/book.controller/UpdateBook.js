const Book = require("../../models/books.model");

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};
