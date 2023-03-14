const bookModel = require("../Model/bookModel");
const { validator } = require("../utils");

/**
 * 
 * @CreateBooks API
 * 
 */

const createBook = async function (req, res) {
  try {
    let requestBody = req.body;

    let { name, imageURL, authorId, pages, price } = requestBody;

    // Validation Start

    if (!validator.isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide book details" });
    }

    if(!validator.isValidObjectId(authorId)){
      return res.status(400).send({message:"invalid author id "})
    }

    if (!validator.isValid(name)) {
      return res.status(400).send({ message: "book name is required" });
    }
    if (!validator.isValid(imageURL)) {
      return res.status(400).send({ message: "imagesURL is required" });
    }

    if (!validator.isValid(authorId)) {
      return res.status(400).send({ message: "authorId is required" });
    }

    if (!validator.isValid(pages)) {
      return res.status(400).send({ message: "pages is required" });
    }

    if (!validator.isValid(price)) {
      return res.status(400).send({ message: "price is required" });
    }

    if (!validator.validNumber(pages)) {
      return res
        .status(400)
        .send({ message: "please enter correct pages number" });
    }

    if (!validator.validNumber(price)) {
      return res.status(400).send({ message: "please enter correct amount" });
    }

    const isNameAlreadyUsed = await bookModel.findOne({ name });
    if (isNameAlreadyUsed) {
      return res.status(400).send({ message: `${name} name is already used` });
    }

    if (!validator.isValidImageURL(imageURL)) {
      return res
        .status(400)
        .send({ status: false, message: `invalid imageURL` });
    }

    // Validation End

    let createBook = await bookModel.create(requestBody);
    return res.status(201).send({
      status: true,
      message: "Book Successfully create",
      data: createBook,
    });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};





/**
 * 
 * @ListOfBooks API
 * 
 */

const getBooks = async function (req, res) {
  try {
    const listBooks = await bookModel.find();

    if (listBooks.length == 0) {
      return res.status(200).send({ message: "books not found" });
    }

    return res.status(200).send({ message: "List of Books", Books: listBooks });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};





/**
 * 
 * @UpdateBook API
 * 
 */

const updateBook = async function (req, res) {
  try {
    const requestBody = req.body;
    const bookId = req.params.bookId;

    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ message: `${bookId} is not a valid book Id` });
    }

    const book = await bookModel.findOne({ _id: bookId });

    if (!book) {
      return res.status(404).send({ message: `Book not found` });
    }

    if (!validator.isValidRequestBody(requestBody)) {
      res
        .status(200)
        .send({
          status: true,
          message: "No paramateres passed. Book unmodified",
        });
      return;
    }

    const { name, pages, price } = requestBody;

    const isNameAlreadyUsed = await bookModel.findOne({ name });
    if (isNameAlreadyUsed) {
      return res
        .status(400)
        .send({ message: `${name} name is already exists` });
    }

    let updateBook = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $set: { name: name, pages: pages, price: price } },
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "Succesfully Updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};





/**
 * 
 * @deleteBooks API
 * 
 */

const deleteBooks = async function (req, res) {
  try {
    const bookId = req.params.bookId;

    if (!validator.isValidObjectId(bookId)) {
      res.status(400).send({ message: `${bookId} is not a valid book id` });
    }

    const book = await bookModel.findOne({ _id: bookId });

    if (!book) {
      res.status(404).send({ status: false, message: `Book not found` });
    }

    await bookModel.deleteOne({ _id: bookId });

    res.send(200).send({ statur: true, message: `Book deleted successfully` });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBooks,
};
