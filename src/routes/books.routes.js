const bookRouter = require("express").Router();

const CreateBook = require("../controllers/book.controller/CreateBook");
const DeleteBook = require("../controllers/book.controller/DeleteBook");
const GetAllBooks = require("../controllers/book.controller/GetAllBooks");
const GetSingleBook = require("../controllers/book.controller/GetSingleBook");
const UpdateBook = require("../controllers/book.controller/UpdateBook");
// const { populateBooks } = require("../controllers/book.controller/Populate");

// bookRouter.post("/populate-books", populateBooks);
bookRouter.get("/all-books", GetAllBooks);
bookRouter.get("/single-book/:id", GetSingleBook);
bookRouter.delete("/delete-book/", DeleteBook);
bookRouter.patch("/update-book/:id", UpdateBook);
bookRouter.post("/create-book", CreateBook);

module.exports = bookRouter;
