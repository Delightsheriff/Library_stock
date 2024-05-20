const Book = require("../models/books.model");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");

const createBook = async (req, res) => {
  const {
    tittle: title,
    author,
    description,
    coursecode,
    quantity,
    department,
  } = req.body;

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

const borrowBook = async (req, res) => {
  try {
    // const { id: bookId } = req.params;
    const {
      params: { id: bookId },
      body: { matricNumber, studentDepartment, studentName },
    } = req;
    const book = await Book.findById({ _id: bookId });
    if (!book) {
      // return res.status(StatusCodes.NOT_FOUND).json({ message: "Book not found" });
      throw new customError.NotFoundError(`Book with id: ${bookId} not found`);
    }
    if (book.quantity < 1) {
      // return res.status(StatusCodes.BAD_REQUEST).json({ message: "No available copies" });
      throw new customError.BadRequestError(`no available copies`);
    }

    book.borrowedBy = {
      matricNumber,
      studentDepartment,
      studentName,
    };
    book.quantity -= 1;

    await book.save();
    res
      .status(StatusCodes.OK)
      .json({ message: "Book borrowed successfully", book });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
    console.log(error);
  }
};

// Return a book
const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (!book.borrowedBy || book.borrowedBy.returned) {
      // return res.status(StatusCodes.BAD_REQUEST).json({
      //   message: "Book was not borrowed or has already been returned",
      // });
      throw new customError.BadRequestError(
        `Book was not borrowed or has already been returned`
      );
    }

    book.borrowedBy.returned = true;
    book.quantity += 1;

    await book.save();
    res
      .status(StatusCodes.OK)
      .json({ message: "Book returned successfully", book });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
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
