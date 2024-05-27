// const express = require("express");
// const router = express.Router();

// const {
//   createBook,
//   getAllBooks,
//   getSingleBook,
//   updateBook,
//   deleteBook,
//   borrowBook,
//   returnBook,
// } = require("../controllers/BooksController");

// router.route("/").get(getAllBooks).post(createBook);

// router.route("/:id").get(getSingleBook).patch(updateBook).delete(deleteBook);

// router.route("/borrow/:id").post(borrowBook);
// router.route("/return/:id").post(returnBook);
// module.exports = router;

const bookRouter = require("express").Router();

const CreateBook = require("../controllers/book.controller/CreateBook");
const DeleteBook = require("../controllers/book.controller/DeleteBook");
const GetAllBooks = require("../controllers/book.controller/GetAllBooks");
const GetSingleBook = require("../controllers/book.controller/GetSingleBook");
const UpdateBook = require("../controllers/book.controller/UpdateBook");
// const { populateBooks } = require("../controllers/book.controller/Populate"); // Ensure correct path to your controller

// Endpoint to populate the database with books
// bookRouter.post("/populate-books", populateBooks);
bookRouter.get("/all-books", GetAllBooks);
bookRouter.get("/single-book/:id", GetSingleBook);
bookRouter.delete("/delete-book/:id", DeleteBook);
bookRouter.put("/update-book/:id", UpdateBook);
bookRouter.post("/create-book", CreateBook);

module.exports = bookRouter;
