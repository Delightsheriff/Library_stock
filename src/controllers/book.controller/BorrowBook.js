const Borrowing = require("../../models/borrow.model");

module.exports = async (req, res) => {
  const { bookId, studentName, matriculationNumber, returnDate, librarianId } =
    req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ message: "Book is out of stock" });
    }

    const borrowing = new Borrowing({
      book: bookId,
      studentName,
      matriculationNumber,
      borrowDate: Date.now(),
      returnDate,
      librarian: librarianId,
    });

    await borrowing.save();

    book.quantity -= 1;
    await book.save();

    res.json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error borrowing book" });
  }
};
