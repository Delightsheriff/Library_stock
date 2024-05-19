const Book = require("../models/books.model");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");

const createBook = async (req, res) => {
  const { title, author, description, coursecode, quantity, department } =
    req.body;

  if (
    !title ||
    !author ||
    !description ||
    !coursecode ||
    !quantity ||
    !department
  ) {
    throw new customError.BadRequestError("Please provide all values");
  }

  const book = await Book.create(req.body);

  res.status(StatusCodes.CREATED).json({ book });
};

const getAllBooks = async (req, res) => {
  const books = await Book.find({});
  res.status(StatusCodes.OK).json({ books, count: books.length });
};

const getSingleBook = async (req, res) => {
  //   const book = await Book.findById(req.params.id);

  const { id: bookId } = req.params;
  const book = await Book.findOne({ _id: bookId });

  if (!book) {
    throw new customError.NotFoundError(`No book with id : ${bookId}`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const updateBook = async (req, res) => {
  const { id: bookId } = req.params;

  const book = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    throw new customError.NotFoundError(`No book with id : ${bookId}`);
  }

  res.status(StatusCodes.OK).json({ book });
};

const deleteBook = async (req, res) => {
  const { id: bookId } = req.params;

  const book = await Book.findOne({ _id: bookId });
  if (!book) {
    throw new customError.NotFoundError(`No book with id : ${bookId}`);
  }
  await book.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! book removed" });
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};

// const uploadImage = async (req, res) => {
//     console.log(req.files);
//     //check if file exists from postman
//     if (!req.files) {
//       throw new customError.BadRequestError("no image uploaded");
//     }

//     //if uploaded file is an image
//     const productImage = req.files.image;
//     if (!productImage.mimetype.startswith("image")) {
//       throw new customError.BadRequestError("please upload image");
//     }

//     const maxSize = 1024 * 1024;
//     if (!productImage.size > maxSize) {
//       throw new customError.BadRequestError("please upload image less than 1 mb");
//     }

//     //set path
//     const imagePath = path.join(
//       __dirname /**get current dirrectory  */,
//       "../public/uploads/" + `${productImage.name}`
//     );
//     await productImage.mv(imagePath);
//     res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
//   };
