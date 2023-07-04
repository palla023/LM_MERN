import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./books.css";
import { AddBook, UpdateBook } from "../../../apicalls/books.js";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

const BookForm = ({
  open,
  setOpen,
  reloadBooks,
  formType,
  setFormType,
  selectedBook,
  setSelectedBook,
}) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    author: "",
    publisher: "",
    publishedDate: "",
    rentPerDay: "",
    totalCopies: "",
  });
  useEffect(() => {
    if (selectedBook) {
      setFormData({
        title: selectedBook.title,
        description: selectedBook.description,
        category: selectedBook.category,
        image: selectedBook.image,
        author: selectedBook.author,
        publisher: selectedBook.publisher,
        publishedDate: selectedBook.publishedDate
          ? new Date(selectedBook.publishedDate).toISOString().split("T")[0]
          : null,
        rentPerDay: selectedBook.rentPerDay,
        totalCopies: selectedBook.totalCopies,
      });
    }
  }, [selectedBook]);
  const {
    title,
    description,
    category,
    image,
    author,
    publisher,
    publishedDate,
    rentPerDay,
    totalCopies,
  } = formData;
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      formData.createdBy = user._id;
      formData.availableCopies = formData.totalCopies;
      if (formType === "add") {
        await AddBook(formData);
        toast.success("Book Added successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        formData._id = selectedBook._id; //formData is an object that holds data for updating a book, and _id is a property used to uniquely identify the book.
        await UpdateBook(formData);
        toast.success("Book Updated successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      reloadBooks(); // reload the data after submission
      setOpen(false); // close the modal form when the form submission has finished
      dispatch(HideLoading());
    } catch (e) {
      dispatch(HideLoading());
      console.log(e);
    }
    setFormData({
      title: "",
      description: "",
      image: "",
      category: "",
      author: "",
      publisher: "",
      publishedDate: "",
      rentPerDay: "",
      totalCopies: "",
    });
  };
  return (
    <>
      <Modal
        title={formType === "add" ? "Add Book" : "Edit Book"}
        open={open}
        onCancel={() => setOpen(false)}
        centered
        width={800}
        footer={null}
      >
        <div className="container">
          <form onSubmit={submitHandler}>
            <div className="row">
              <div className="col-12 mb-2">
                <span>Title</span>
                <input
                  type="text"
                  className="form-control my-form-input"
                  name="title"
                  value={title}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="col-12 mb-2">
              <span>Description</span>
              <textarea
                className="form-control my-form-input"
                rows="4"
                name="description"
                value={description}
                onChange={changeHandler}
              ></textarea>
            </div>

            <div className="col-12 mb-2">
              <span>Image URL</span>
              <input
                type="text"
                className="form-control my-form-input"
                name="image"
                value={image}
                onChange={changeHandler}
              />
            </div>
            <div className="col-12 mb-2">
              <label htmlFor="category">Category</label>
              <select
                className="form-control my-form-input"
                id="category"
                name="category"
                value={category}
                onChange={changeHandler}
                required
              >
                <option value="">Select Category</option>
                <option value="General">
                  General-purpose programming languages
                </option>
                <option value="Functional">
                  Functional programming languages
                </option>
                <option value="Oops">
                  Object-oriented programming languages
                </option>
                <option value="Web">Web development languages</option>
                <option value="Data">Data-focused languages</option>
                <option value="Compiled">Compiled languages</option>
                <option value="Markup">Markup languages</option>
              </select>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <span>Author</span>
                <input
                  type="text"
                  className="form-control my-form-input"
                  name="author"
                  value={author}
                  onChange={changeHandler}
                />
              </div>
              <div className="col-md-4">
                <span>Publisher</span>
                <input
                  type="text"
                  className="form-control my-form-input"
                  name="publisher"
                  value={publisher}
                  onChange={changeHandler}
                />
              </div>
              <div className="col-md-4">
                <span>Published Date</span>
                <input
                  type="date"
                  className="form-control my-form-input"
                  name="publishedDate"
                  value={publishedDate}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <span>Rent</span>
                <input
                  type="text"
                  className="form-control my-form-input"
                  name="rentPerDay"
                  value={rentPerDay}
                  onChange={changeHandler}
                />
              </div>
              <div className="col-md-6">
                <span>Total Copies</span>
                <input
                  type="text"
                  className="form-control my-form-input"
                  name="totalCopies"
                  value={totalCopies}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button
                onClick={() => setOpen(false)}
                className="btn btn-outline-warning mx-2"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </Modal>
    </>
  );
};

export default BookForm;

/*
toISOString(): The toISOString() method converts the Date object to a string representation in ISO 8601 format.

.split("T")[0]: The split("T") method splits the string at the "T" delimiter, which separates the date and time in the ISO 8601 format. 
[0] retrieves the first element of the resulting array, which represents the date portion.
 */
