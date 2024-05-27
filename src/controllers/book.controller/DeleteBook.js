const Book = require("../../models/books.model");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndRemove(id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};
