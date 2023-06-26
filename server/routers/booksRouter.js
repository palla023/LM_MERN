const express = require("express");
const router = express.Router();
const Books = require("../models/BookModel.js");
const middleware = require("../middleware/middleware.js");


//add a book
router.post("/add-book", middleware, async (req, res) => {
  try {
    const newbook = new Books(req.body);
    await newbook.save();
    res.status(201).json({ message: "NewBook added Successfully", newbook });
  } catch (err) {
    {
      res.status(500).json(err);
    }
  }
});

//update a book
router.put("/update-book/:id", middleware, async (req, res) => {
  try {
    const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Book updated Successfully", updatedBook });
  } catch (err) {
    {
      res.status(500).json(err);
    }
  }
});

//delete a book

router.delete("/delete-book/:id", middleware, async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted Successfully", deletedBook });
  } catch (err) {
    {
      res.status(500).json(err);
    }
  }
});

//get all books
router.get("/get-all-books", middleware, async (req, res) => {
  try {
    const books = await Books.find().sort({ createdAt: -1 });
    return res.send({ success: true, data: books });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});


//get a book by id

router.get("/get-book/:id", middleware, async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    return res.send({ success: true, data: book });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});


module.exports = router;