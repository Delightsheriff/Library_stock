const Book = require("../../models/books.model");

module.exports = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    author,
    ISBN,
    publisher,
    publication_date,
    description,
    category,
    quantity,
  } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = title;
    book.author = author;
    book.ISBN = ISBN;
    book.publisher = publisher;
    book.publication_date = publication_date;
    book.description = description;
    book.category = category;
    book.quantity = quantity;

    await book.save();
    res.json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};
