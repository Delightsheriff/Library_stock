// const Book = require("../models/books.model");
// const { StatusCodes } = require("http-status-codes");
// const customError = require("../errors");

// const createBook = async (req, res) => {
//   const {
//     tittle: title,
//     author,
//     description,
//     coursecode,
//     quantity,
//     department,
//   } = req.body;

//   if (
//     !title ||
//     !author ||
//     !description ||
//     !coursecode ||
//     !quantity ||
//     !department
//   ) {
//     throw new customError.BadRequestError("Please provide all values");
//   }

//   const book = await Book.create(req.body);

//   res.status(StatusCodes.CREATED).json({ book });
// };

// const borrowBook = async (req, res) => {
//   try {
//     // const { id: bookId } = req.params;
//     const {
//       params: { id: bookId },
//       body: { matricNumber, studentDepartment, studentName },
//     } = req;
//     const book = await Book.findById({ _id: bookId });
//     if (!book) {
//       // return res.status(StatusCodes.NOT_FOUND).json({ message: "Book not found" });
//       throw new customError.NotFoundError(`Book with id: ${bookId} not found`);
//     }
//     if (book.quantity < 1) {
//       // return res.status(StatusCodes.BAD_REQUEST).json({ message: "No available copies" });
//       throw new customError.BadRequestError(`no available copies`);
//     }

//     book.borrowedBy = {
//       matricNumber,
//       studentDepartment,
//       studentName,
//     };
//     book.quantity -= 1;

//     await book.save();
//     res
//       .status(StatusCodes.OK)
//       .json({ message: "Book borrowed successfully", book });
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: error.message });
//     console.log(error);
//   }
// };

// // Return a book
// const returnBook = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }
//     if (!book.borrowedBy || book.borrowedBy.returned) {
//       // return res.status(StatusCodes.BAD_REQUEST).json({
//       //   message: "Book was not borrowed or has already been returned",
//       // });
//       throw new customError.BadRequestError(
//         `Book was not borrowed or has already been returned`
//       );
//     }

//     book.borrowedBy.returned = true;
//     book.quantity += 1;

//     await book.save();
//     res
//       .status(StatusCodes.OK)
//       .json({ message: "Book returned successfully", book });
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: error.message });
//   }
// };

// module.exports = {
//   createBook,
//   getAllBooks,
//   getSingleBook,
//   updateBook,
//   deleteBook,
//   borrowBook,
//   returnBook,
// };

// // const uploadImage = async (req, res) => {
// //     console.log(req.files);
// //     //check if file exists from postman
// //     if (!req.files) {
// //       throw new customError.BadRequestError("no image uploaded");
// //     }

// //     //if uploaded file is an image
// //     const productImage = req.files.image;
// //     if (!productImage.mimetype.startswith("image")) {
// //       throw new customError.BadRequestError("please upload image");
// //     }

// //     const maxSize = 1024 * 1024;
// //     if (!productImage.size > maxSize) {
// //       throw new customError.BadRequestError("please upload image less than 1 mb");
// //     }

// //     //set path
// //     const imagePath = path.join(
// //       __dirname /**get current dirrectory  */,
// //       "../public/uploads/" + `${productImage.name}`
// //     );
// //     await productImage.mv(imagePath);
// //     res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
// //   };

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker"); // or 'faker' depending on your version
const Book = require("../../models/books.model"); // Ensure correct path to your Book model
// require("dotenv").config();
const envConstants = require("../../configs/constants");

const categories = [
  "Programming_Languages",
  "Software_Development",
  "Computer_Science",
  "Web_Development",
  "Database_Management",
  "Artificial_Intelligence",
  "Cybersecurity",
  "Computer_Graphics",
  "Networking",
  "Operating_Systems",
];

const titles = {
  Programming_Languages: [
    "Learning Python",
    "JavaScript: The Good Parts",
    "Effective Java",
    "Programming Ruby",
    "C++ Primer",
  ],
  Software_Development: [
    "Clean Code",
    "The Pragmatic Programmer",
    "Code Complete",
    "Refactoring",
    "The Mythical Man-Month",
  ],
  Computer_Science: [
    "Introduction to Algorithms",
    "The Art of Computer Programming",
    "Algorithms Unlocked",
    "Computer Science: An Overview",
    "Structure and Interpretation of Computer Programs",
  ],
  Web_Development: [
    "HTML and CSS: Design and Build Websites",
    "JavaScript and JQuery",
    "Learning PHP, MySQL & JavaScript",
    "You Don't Know JS",
    "Eloquent JavaScript",
  ],
  Database_Management: [
    "SQL for Dummies",
    "Database System Concepts",
    "Learning SQL",
    "Seven Databases in Seven Weeks",
    "The Data Warehouse Toolkit",
  ],
  Artificial_Intelligence: [
    "Artificial Intelligence: A Modern Approach",
    "Deep Learning",
    "Machine Learning Yearning",
    "Pattern Recognition and Machine Learning",
    "The Hundred-Page Machine Learning Book",
  ],
  Cybersecurity: [
    "The Web Application Hacker's Handbook",
    "Metasploit",
    "Hacking: The Art of Exploitation",
    "Cybersecurity and Cyberwar",
    "Security Engineering",
  ],
  Computer_Graphics: [
    "Real-Time Rendering",
    "Computer Graphics: Principles and Practice",
    "OpenGL Programming Guide",
    "Mathematics for 3D Game Programming and Computer Graphics",
    "3D Computer Graphics",
  ],
  Networking: [
    "Computer Networking: A Top-Down Approach",
    "Network+ Guide to Networks",
    "Data Communications and Networking",
    "Internetworking with TCP/IP",
    "Network Security Essentials",
  ],
  Operating_Systems: [
    "Operating System Concepts",
    "Modern Operating Systems",
    "Understanding the Linux Kernel",
    "Windows Internals",
    "The Design of the UNIX Operating System",
  ],
};
const createBooks = () => {
  const books = [];
  for (let i = 0; i < 400; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const book = new Book({
      title:
        titles[category][Math.floor(Math.random() * titles[category].length)],
      author: faker.person.fullName(), // Correct method for generating a full name
      ISBN: faker.datatype.uuid(),
      publisher: faker.company.name(),
      publication_date: faker.date.past(),
      description: faker.lorem.paragraph(),
      category: category,
      quantity: faker.datatype.number({ min: 1, max: 20 }),
      location: `Section ${faker.random
        .alpha({ count: 1 })
        .toUpperCase()} - Shelf ${faker.datatype.number({ min: 1, max: 10 })}`,
    });
    books.push(book);
  }
  return books;
};

const populateBooks = async (req, res) => {
  try {
    await mongoose.connect(envConstants.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connection Successful");

    const books = createBooks();
    await Book.insertMany(books);
    console.log("Books inserted");

    res.status(201).send({ message: "Books successfully inserted", books });
  } catch (error) {
    console.error("Error inserting books:", error);
    res.status(500).send({ error: "Error inserting books" });
  } finally {
    mongoose.connection.close();
  }
};

module.exports = { populateBooks };
