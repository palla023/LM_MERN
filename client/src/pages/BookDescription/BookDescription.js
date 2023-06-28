/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetBookById } from "../../apicalls/books";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";

const BookDescription = () => {
  const [bookData, setBookData] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const getBook = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookById(id);
      dispatch(HideLoading());
      if (response.success) {
        setBookData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  
  useEffect(() => {
    getBook();
  }, []);
  return (
    bookData && (
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-secondary text-uppercase font-weight-bolder mt-2">
              {bookData?.title}
            </h1>
            <hr />
            <div className="mb-3">
              <img src={bookData.image} alt="" height={400} width={400} />
            </div>

            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <p className="text-muted mb-0">{bookData?.description}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Author</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{bookData?.author}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Publisher</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{bookData?.publisher}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Published Date</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {moment(bookData?.publishedDate).format("MMMM Do YYYY")}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Available Copies</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {bookData?.availableCopies}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BookDescription;
