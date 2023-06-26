/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { message} from "antd";
import { GetIssues } from "../../../apicalls/issues";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";


const BorrowedBooks = () => {
	const {user} = useSelector((state) => state.users);
	const [issuedBooks, setIssuedBooks] = useState([]);
	const dispatch = useDispatch();
	const getIssues = async () => {
	  try {
		dispatch(ShowLoading());
		const response = await GetIssues({
		  user: user._id,
		});
		dispatch(HideLoading());
		if (response.success) {
		  setIssuedBooks(response.data);
		}
	  } catch (error) {
		dispatch(HideLoading());
		message.error(error.message);
	  }
	};
  
	useEffect(() => {
	  getIssues();
	}, []);
  

	return(
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
	);
  }
export default BorrowedBooks
