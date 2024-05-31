const Borrowing = require("../../models/borrow.model");
const Book = require("../../models/books.model");

module.exports = async (req, res) => {
  const { borrowingId, returned } = req.body;

  try {
    // Find the borrowing record by its ID
    const borrowing = await Borrowing.findById(borrowingId);

    // Check if the borrowing record exists
    if (!borrowing) {
      return res.status(404).json({ message: "Borrowing record not found" });
    }

    // Check if the book has already been returned
    if (borrowing.returned) {
      return res
        .status(400)
        .json({ message: "Book has already been returned" });
    }

    // Find the book associated with this borrowing record
    const book = await Book.findById(borrowing.book);

    // Check if the book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update the returned status of the borrowing record
    borrowing.returned = returned;
    await borrowing.save();

    // Increment the book quantity only if the book is returned
    if (returned) {
      book.quantity += 1;
      await book.save();
    }

    // Send a success response
    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    console.log(error);
    // Handle any errors
    res.status(500).json({ message: "Error updating book return status" });
  }
};
