const Book = require("../../models/books.model");

module.exports = async (req, res) => {
  const {
    title,
    author,
    ISBN,
    publisher,
    publication_date,
    description,
    category,
    quantity,
  } = req.body;

  try {
    if (
      !title ||
      !author ||
      !ISBN ||
      !publisher ||
      !publication_date ||
      !description ||
      !category ||
      !quantity
    ) {
      return res.status(400).json({ message: "Please provide all values" });
    }
    const book = await Book.create({
      title,
      author,
      ISBN,
      publisher,
      publication_date,
      description,
      category,
      quantity,
    });

    res.status(201).json({ book });
  } catch (error) {
    res.status(500).json({ message: "Error creating book" });
  }
};
