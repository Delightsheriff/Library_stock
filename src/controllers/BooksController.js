const Book = require("../models/books.model");

const createBook = async (req, res) => {
  // const { title, author, description, coursecode, quantity, department } = req.body;
  // if (!title || !author || !description || !coursecode || !quantity || !department) {
  //     return res.status(400).json({ msg: "Please fill in all fields." }); // 400 Bad Request
  // }

  res.send("Book created successfully");
};

const getAllBooks = async (req, res) => {
  //   const books = await Book.find({});
  //   res.send(books);
  res.send("all books ");
};

const getSingleBook = async (req, res) => {
  //   const book = await Book.findById(req.params.id);
  //   res.send(book);
  res.send("single book");
};

const updateBook = async (req, res) => {
  res.send("Book updated successfully");
};

const deleteBook = async (req, res) => {
  res.send("Book deleted successfully");
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
