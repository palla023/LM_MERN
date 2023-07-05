/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetBooks } from "../../apicalls/books";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import "./Home.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [cloneBooks, setCloneBooks] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
        setCloneBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setBooks(cloneBooks);
    } else {
      const filteredBooks = cloneBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm)
      );
      setBooks(filteredBooks);
    }
  };

  return (
    <>
      <div className="container mt-2">
        <div className="row mb-3">
          <div className="col">
            <div className="input-group">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search book name"
                onChange={handleSearch}
              />
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {books.map((book) => (
            <div
              className="col-md-4 mb-5"
              key={book._id}
              onClick={() => navigate(`/book/${book._id}`)}
            >
              <div className="card d-flex shadow" style={{ width: "21rem" }}>
                <img src={book.image} alt="Card Image" />
                <div className="card-content p-3">
                  <h1 className="book-description">{book.title}</h1>
                  <div
                    className={`available-toggle-button  ${
                      book.availableCopies > 0 ? "available" : "not-available"
                    }`}
                  >
                    {book.availableCopies > 0 ? "Available" : "Not Available"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
