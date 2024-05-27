const { Schema, model } = require("mongoose");

const BorrowSchema = new Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  matriculationNumber: {
    type: String,
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  returned: {
    type: Boolean,
    default: false,
  },
});

const Borrowing = model("Borrowing", BorrowSchema);
module.exports = Borrowing;
