/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import "./books.css";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { DeleteIssue, GetIssues, ReturnBook } from "../../../apicalls/issues";
import moment from "moment";
import IssueForm from "./IssueForm";

const Issues = ({ open = false, setOpen, selectedBook, reloadBooks }) => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const dispatch = useDispatch();

  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues({
        book: selectedBook._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setIssues(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const onReturnHandler = async (issue) => {
    try {
      // check if the book is returned before due date
      const today = moment().format("YYYY-MM-DD");
      const dueDate = moment(issue.returnDate).format("YYYY-MM-DD");
      if (today > dueDate) {
        // book is returned after due date
        // calculate the fine
        const fine = moment(today).diff(dueDate, "days") * 3; // 3 is static value
        issue.fine = fine;
      }
      issue.returnedDate = new Date();
      issue.book = issue.book._id; // because we are getting user as an object and we send same like object to server
      dispatch(ShowLoading());
      const response = await ReturnBook(issue);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getIssues();
        reloadBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteIssueHandler = async (issue) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteIssue({
        ...issue,
        book: issue.book._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getIssues();
        reloadBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title=""
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={1400}
      centered
    >
      <h1 className="text-secondary issuebookheading">
        Issues of {selectedBook.title}
      </h1>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th>User</th>
              <th>Issued On</th>
              <th>Return Date(Due Date)</th>
              <th>Rent</th>
              <th>Fine</th>
              <th>Returned On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues &&
              issues.map((issue) => (
                <tr key={issue._id} className="align-middle text-center">
                  <td>{issue._id}</td>
                  <td>{issue.user.name}</td>
                  <td>
                    {moment(issue.issueDate).format("DD-MM-YYYY hh:mm A")}
                  </td>
                  <td>
                    {moment(issue.returnDate).format("DD-MM-YYYY hh:mm A")}
                  </td>
                  <td>{issue.rent}</td>
                  <td className="text-danger">{issue.fine || 0}</td>
                  <td>
                    {issue.returnedDate
                      ? moment(issue.returnedDate).format("DD-MM-YYYY hh:mm A")
                      : "Not Returned Yet"}
                  </td>

                  <td className="d-flex gap-1">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        if (issue.book._id !== selectedBook._id) {
                          message.error("You don't have this book to renew.");
                          return;
                        }
                        if (issue.returnedDate) {
                          message.error("You have already returned this book.");
                          return;
                        }
                        setSelectedIssue(issue);
                        setShowIssueForm(true);
                      }}
                    >
                      Renew
                    </button>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        if (issue.book._id !== selectedBook._id) {
                          message.error("You don't have this book to return.");
                          return;
                        }
                        if (issue.returnedDate) {
                          message.error("You have already returned this book.");
                          return;
                        }
                        onReturnHandler(issue);
                      }}
                    >
                      Return Now
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteIssueHandler(issue)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showIssueForm && (
        <IssueForm
          selectedBook={selectedBook}
          selectedIssue={selectedIssue}
          open={showIssueForm}
          setOpen={setShowIssueForm}
          setSelectedBook={() => {}}
          getData={() => {
            getIssues();
            reloadBooks();
          }}
          type="edit"
        />
      )}
    </Modal>
  );
};

export default Issues;
