const express = require("express");
const router = express.Router();

const {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/BooksController");

router.route("/").get(getAllBooks).post(createBook);

router.route("/:id").get(getSingleBook).patch(updateBook).delete(deleteBook);

router.route("/borrow/:id").post(borrowBook);
router.route("/return/:id").post(returnBook);
module.exports = router;
