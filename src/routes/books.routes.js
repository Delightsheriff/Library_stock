const bookRouter = require("express").Router();

const AllBorrowers = require("../controllers/book.controller/AllBorrowers");
const BorrowBook = require("../controllers/book.controller/BorrowBook");
const CreateBook = require("../controllers/book.controller/CreateBook");
const DeleteBook = require("../controllers/book.controller/DeleteBook");
const GetAllBooks = require("../controllers/book.controller/GetAllBooks");
const GetSingleBook = require("../controllers/book.controller/GetSingleBook");
const ReturnBook = require("../controllers/book.controller/ReturnBook");
const UpdateBook = require("../controllers/book.controller/UpdateBook");
// const { populateBooks } = require("../controllers/book.controller/Populate");

// bookRouter.post("/populate-books", populateBooks);
bookRouter.get("/all-books", GetAllBooks);
bookRouter.get("/single-book/:id", GetSingleBook);
bookRouter.delete("/delete-book/", DeleteBook);
bookRouter.patch("/update-book/:id", UpdateBook);
bookRouter.post("/create-book", CreateBook);

// Routes to handle borrowing and returning books
bookRouter.post("/borrow-book", BorrowBook);
bookRouter.patch("/return-book", ReturnBook);
bookRouter.get("/all-borrowers", AllBorrowers);

module.exports = bookRouter;
