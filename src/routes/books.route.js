const express = require("express");
const router = express.Router();

const {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("../controllers/BooksController");

router.route("/").get(getAllBooks).post(createBook);

router.route("/:id").get(getSingleBook).patch(updateBook).delete(deleteBook);
module.exports = router;
