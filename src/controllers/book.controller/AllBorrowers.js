const Borrowing = require("../../models/borrow.model");

module.exports = async (req, res) => {
  try {
    const borrowings = await Borrowing.find({});
    res.status(200).json({ count: borrowings.length, borrowings });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving borrowings" });
  }
};
