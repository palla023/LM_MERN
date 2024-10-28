const express = require("express");
const router = express.Router();
const Issue = require("../models/IssueModel.js");
const Book = require("../models/BookModel.js");
const middleware = require("../middleware/middleware.js");

//issue a book to user

router.post("/issue-book", middleware, async (req, res) => {
  try {
    // inventory adjustment (available copies must be decremented by 1)
    await Book.findOneAndUpdate(
      { _id: req.body.book }, // Filter to find the book by its _id , here book is an object
      { $inc: { availableCopies: -1 } }
    );
    // issue book to patron (create new issue record)
    const newIssue = new Issue(req.body);
    await newIssue.save();
    return res.send({
      success: true,
      message: "Book issued successfully",
      data: newIssue,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// get issues
router.post("/get-issues", middleware, async (req, res) => {
  try {
    delete req.user.id;
    const issues = await Issue.find(req.body) //we can get the bookId from frontend and by using that we can filter in the issues and get the details
      .populate("book")
      .populate("user")
      .sort({ issueDate: -1 });
    return res.send({
      success: true,
      message: "Issues fetched successfully",
      data: issues,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
}); // By using the POST method and sending the criteria in the request body,
//you have more control over the parameters and can handle more complex filtering or sorting requirements.

// return a book
router.post("/return-book", middleware, async (req, res) => {
  try {
    // inventory adjustment (available copies must be incremented by 1)
    await Book.findOneAndUpdate(
      {
        _id: req.body.book, // here book is an object inside issues model
      },
      {
        $inc: { availableCopies: 1 },
      }
    );

    // return book (update issue record)
    await Issue.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body
    );

    return res.send({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete an issue
router.post("/delete-issue", middleware, async (req, res) => {
  try {
    // inventory adjustment (available copies must be incremented by 1)
    await Book.findOneAndUpdate(
      {
        _id: req.body.book,
        // availableCopies: { $lt: req.body.book.totalCopies },
      },
      { $inc: { availableCopies: 1 } }
    );

    // delete issue
    await Issue.findOneAndDelete({ _id: req.body._id });
    res.send({ success: true, message: "Issue deleted successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// edit an issue
router.post("/edit-issue", middleware, async (req, res) => {
  try {
    await Issue.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      req.body
    );
    res.send({ success: true, message: "Issue updated successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

module.exports = router;
