/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Modal } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { GetIssues } from "../../../apicalls/issues";
import moment from "moment";

const IssuedBooks = ({ showIssuedBooks, setShowIssuedBooks, selectedUser }) => {
  const [issuedBooks, setIssuedBooks] = useState([]);
 
  const dispatch = useDispatch();
  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues({
        user: selectedUser._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setIssuedBooks(response.data);
		// console.log(issuedBooks)
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);
  return (
    <Modal
      open={showIssuedBooks}
      onCancel={() => setShowIssuedBooks(false)}
      footer={null}
      width={1400}
	  
    >
      <h1 className="text-secondary issuebookheading">
        {selectedUser.name}'s Issued Books
      </h1>
	  <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th>Book</th>
              <th>Issued On</th>
              <th>Return Date(Due Date)</th>
              <th>Rent</th>
              <th>Fine</th>
              <th>Returned On</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks &&
			
              issuedBooks.map((book) => (
                <tr key={book._id} className="align-middle text-center">
                  <td>{book._id}</td>
				  {/* book is an obj, so we iterate book obj to get tile  */}
                  <td>{book.book.title}</td>  
                  <td>
                    {moment(book.issueDate).format("DD-MM-YYYY hh:mm A")}
                  </td>
                  <td>
                    {moment(book.returnDate).format("DD-MM-YYYY hh:mm A")}
                  </td>
                  <td>{book.rent}</td>
                  <td>{book.fine || 0}</td>
                  <td>
                    {book.returnedDate
                      ? moment(book.returnedDate).format("DD-MM-YYYY hh:mm A")
                      : "Not Returned Yet"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default IssuedBooks;
