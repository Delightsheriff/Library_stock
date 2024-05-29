const { Schema, model, mongoose } = require("mongoose");

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
  librarian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Borrowing = model("Borrowing", BorrowSchema);

module.exports = Borrowing;
