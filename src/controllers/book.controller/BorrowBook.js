const Borrowing = require("../../models/borrow.model");
const Book = require("../../models/books.model");
const User = require("../../models/user.model");

module.exports = async (req, res) => {
  const { bookId, studentName, matriculationNumber, returnDate, librarianId } =
    req.body;

  try {
    if (
      !bookId ||
      !studentName ||
      !matriculationNumber ||
      !returnDate ||
      !librarianId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

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

    return res.json({ message: "Book borrowed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error borrowing book" });
  }
};
