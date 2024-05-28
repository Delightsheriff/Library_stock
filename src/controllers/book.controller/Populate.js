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
    "Python Crash Course",
    "Head First Java",
    "Eloquent JavaScript",
    "Learning Perl",
    "The C Programming Language",
    "Python Cookbook",
    "JavaScript: The Definitive Guide",
    "Clean Code in Python",
    "Java Concurrency in Practice",
    "Ruby on Rails Tutorial",
  ],
  Software_Development: [
    "Clean Code",
    "The Pragmatic Programmer",
    "Code Complete",
    "Refactoring",
    "The Mythical Man-Month",
    "Domain-Driven Design",
    "Test-Driven Development by Example",
    "Design Patterns: Elements of Reusable Object-Oriented Software",
    "Continuous Delivery",
    "Extreme Programming Explained",
    "Agile Software Development: Principles, Patterns, and Practices",
    "Domain-Specific Languages",
    "Implementing Domain-Driven Design",
    "The Clean Coder",
    "Agile Estimating and Planning",
  ],
  Computer_Science: [
    "Introduction to Algorithms",
    "The Art of Computer Programming",
    "Algorithms Unlocked",
    "Computer Science: An Overview",
    "Structure and Interpretation of Computer Programs",
    "Concrete Mathematics",
    "Computer Organization and Design",
    "Operating System Concepts",
    "Database Management Systems",
    "Artificial Intelligence: Foundations of Computational Agents",
    "Discrete Mathematics and Its Applications",
    "Automata Theory, Languages, and Computation",
    "Computer Networks",
    "Compilers: Principles, Techniques, and Tools",
    "Graph Theory",
  ],
  Web_Development: [
    "HTML and CSS: Design and Build Websites",
    "JavaScript and JQuery",
    "Learning PHP, MySQL & JavaScript",
    "You Don't Know JS",
    "Eloquent JavaScript",
    "Node.js in Action",
    "React: Up & Running",
    "Learning Web Design",
    "Vue.js: Up and Running",
    "Learning React",
    "CSS Secrets",
    "Learning Node.js",
    "AngularJS: Up and Running",
    "Head First HTML and CSS",
    "Responsive Web Design with HTML5 and CSS3",
  ],
  Database_Management: [
    "SQL for Dummies",
    "Database System Concepts",
    "Learning SQL",
    "Seven Databases in Seven Weeks",
    "The Data Warehouse Toolkit",
    "SQL Performance Explained",
    "High Performance MySQL",
    "MongoDB: The Definitive Guide",
    "SQL Cookbook",
    "NoSQL Distilled",
    "Learning MySQL",
    "Oracle Database 12c: The Complete Reference",
    "Database Design for Mere Mortals",
    "PostgreSQL: Up and Running",
    "Learning Apache Cassandra",
  ],
  Artificial_Intelligence: [
    "Artificial Intelligence: A Modern Approach",
    "Deep Learning",
    "Machine Learning Yearning",
    "Pattern Recognition and Machine Learning",
    "The Hundred-Page Machine Learning Book",
    "Python Machine Learning",
    "Reinforcement Learning: An Introduction",
    "Deep Reinforcement Learning Hands-On",
    "Natural Language Processing with Python",
    "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
    "Machine Learning: A Probabilistic Perspective",
    "Neural Networks and Deep Learning",
    "Deep Learning for Computer Vision",
    "Artificial Intelligence for Games",
    "Introduction to Autonomous Robots",
  ],
  Cybersecurity: [
    "The Web Application Hacker's Handbook",
    "Metasploit",
    "Hacking: The Art of Exploitation",
    "Cybersecurity and Cyberwar",
    "Security Engineering",
    "CISSP All-in-One Exam Guide",
    "Practical Malware Analysis",
    "The Tangled Web",
    "Network Security Essentials",
    "Cryptography Engineering",
    "Penetration Testing: A Hands-On Introduction to Hacking",
    "Black Hat Python",
    "Social Engineering: The Art of Human Hacking",
    "Web Hacking 101",
    "Gray Hat Hacking: The Ethical Hacker's Handbook",
  ],
  Computer_Graphics: [
    "Real-Time Rendering",
    "Computer Graphics: Principles and Practice",
    "OpenGL Programming Guide",
    "Mathematics for 3D Game Programming and Computer Graphics",
    "3D Computer Graphics",
    "Physically Based Rendering",
    "Computer Graphics: From Pixels to Programmable Graphics Hardware",
    "GPU Gems",
    "Interactive Computer Graphics",
    "Computer Animation: Algorithms and Techniques",
    "Advanced Graphics Programming Using OpenGL",
    "Graphics Shaders: Theory and Practice",
    "Introduction to Computer Graphics",
    "Foundations of 3D Computer Graphics",
    "Practical Rendering and Computation with Direct3D 11",
  ],
  Networking: [
    "Computer Networking: A Top-Down Approach",
    "Network+ Guide to Networks",
    "Data Communications and Networking",
    "Internetworking with TCP/IP",
    "Network Security Essentials",
    "TCP/IP Illustrated",
    "Computer Networking Problems and Solutions",
    "Wireshark Network Analysis",
    "Computer Networking: Principles, Protocols and Practice",
    "Network Security: Private Communication in a Public World",
    "Data and Computer Communications",
    "The TCP/IP Guide",
    "Network Warrior",
    "Network Forensics: Tracking Hackers through Cyberspace",
    "Network Security Technologies and Solutions",
  ],
  Operating_Systems: [
    "Operating System Concepts",
    "Modern Operating Systems",
    "Understanding the Linux Kernel",
    "Windows Internals",
    "The Design of the UNIX Operating System",
    "Operating Systems: Design and Implementation",
    "Operating Systems: Three Easy Pieces",
    "Linux Kernel Development",
    "Advanced Programming in the UNIX Environment",
    "Linux Device Drivers",
    "Windows System Programming",
    "The Linux Programming Interface",
    "Linux Kernel Networking",
    "Linux System Programming",
    "Linux Device Drivers Development",
  ],
};

const startDate = new Date(
  new Date().getTime() - 10 * 365 * 24 * 60 * 60 * 1000,
);

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
      publication_date: faker.date.between(startDate, new Date()),
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
