const Borrowing = require("../../models/borrow.model");

module.exports = async (req, res) => {
  const { borrowingId, returned } = req.body;

  try {
    // Find the borrowing record by its ID
    const borrowing = await Borrowing.findById(borrowingId);

    // Check if the borrowing record exists
    if (!borrowing) {
      return res.status(404).json({ message: "Borrowing record not found" });
    }

    // Update the returned status of the borrowing record
    borrowing.returned = returned;
    await borrowing.save();

    // Send a success response
    res
      .status(200)
      .json({ message: "Book return status updated successfully" });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Error updating book return status" });
  }
};
