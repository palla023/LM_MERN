/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BookForm from "./BookForm.js";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { GetBooks, DeleteBook } from "../../../apicalls/books.js";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice.js";
import Issues from "./Issues.js";
import IssueForm from "./IssueForm.js";
const Books = () => {
  const [formType, setFormType] = useState("add");
  const [selectedBook, setSelectedBook] = useState(null);
  const [openBookForm, setOpenBookForm] = useState(false);
  const [openIssues, setOpenIssues] = useState(false);
  const [openIssuesForm, setOpenIssuesForm] = useState(false);
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBooks();
      setBooks(response.data);
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      console.log(err);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);

  const deleteHandler = async (id) => {
    try {
      dispatch(ShowLoading());
      await DeleteBook(id);
      toast.success("Book deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      getBooks();
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      console.log(err);
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-end ">
        <button
          onClick={() => {
            setFormType("add");
            setSelectedBook(null);
            setOpenBookForm(true);
          }}
          className="btn btn-primary mb-2"
        >
          Add Book
        </button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>Book</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Total Copies</th>
              <th>Available Copies</th>
              <th>createdAt</th>
              <th>Actions</th>
              <th>Issue Actions</th>
            </tr>
          </thead>
          <tbody>
            {books &&
              books.map((book) => (
                <tr key={book._id} className="align-middle text-center">
                  <td>
                    <img src={book.image} alt="book" width="70" height="80" />{" "}
                  </td>
                  <td>{book.title}</td>
                  <td>{book.category}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.totalCopies}</td>
                  <td>{book.availableCopies}</td>
                  <td>{moment(book.createdAt).format("DD-MM-YYYY")}</td>
                  <td className="flex gap-1">
                    <i
                      className="ri-pencil-line ms-1 text-warning"
                      onClick={() => {
                        setFormType("edit");
                        setSelectedBook(book);
                        setOpenBookForm(true);
                      }}
                    ></i>
                    <i
                      className="ri-delete-bin-5-line mx-2  text-danger"
                      onClick={() => deleteHandler(book._id)}
                    ></i>
                  </td>
                  <td>
                    <span
                      className="issuespan"
                      onClick={() => {
                        setOpenIssues(true);
                        setSelectedBook(book);
                      }}
                    >
                      Issues
                    </span>
                    <span
                      className="issuespan ms-2"
                      onClick={() => {
                        setOpenIssuesForm(true);
                        setSelectedBook(book);
                      }}
                    >
                      Issue Book
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {openBookForm && (
        <BookForm
          open={openBookForm}
          setOpen={setOpenBookForm}
          reloadBooks={getBooks}
          formType={formType}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          setFormType={setFormType}
        />
      )}
      {openIssues && (
        <Issues
          open={openIssues}
          setOpen={setOpenIssues}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          reloadBooks={getBooks}
        />
      )}

      {openIssuesForm && (
        <IssueForm
          open={openIssuesForm}
          setOpen={setOpenIssuesForm}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          getData={getBooks}
          type="add"
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Books;
