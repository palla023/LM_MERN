/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { GetUserById } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
// import { EditIssue, IssueBook } from "../../../apicalls/issues";
import "./books.css";
import { EditIssue, IssueBook } from "../../../apicalls/issues";

const IssueForm = ({
  open = false,
  setOpen,
  selectedBook,
  setSelectedBook,
  getData,
  selectedIssue,
  type,
}) => {
  const { user } = useSelector((state) => state.users);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(
    type === "edit" ? selectedIssue.user._id : ""
  );
  const [returnDate, setReturnDate] = React.useState(
    type === "edit" ? moment(selectedIssue.returnDate).format("YYYY-MM-DD") : ""
  );
  const dispatch = useDispatch();

  const validate = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetUserById(userId);
      if (response.success) {
        if (response.data.role !== "user") {
          setValidated(false);
          setErrorMessage("This id is not belongs to user");
          dispatch(HideLoading());
          return;
        } else {
          setUserData(response.data);
          setValidated(true);
          setErrorMessage("");
        }
      } else {
        setValidated(false);
        setErrorMessage(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      setValidated(false);
      setErrorMessage(error.message);
    }
  };
  const onIssue = async () => {
    try {
      dispatch(ShowLoading());

      if (selectedBook.availableCopies === 0) {
        message.error("Book is not available for issuing.");
        dispatch(HideLoading());
        return;
      }
      let response = null;
      if (type !== "edit") {
        response = await IssueBook({
          //as per the MongoDb only we can send values
          book: selectedBook._id,
          user: userData._id,
          issueDate: new Date(),
          returnDate,
          rent:
            (moment(returnDate).diff(moment(), "days") + 1) *
            (selectedBook?.rentPerDay || 0),
          fine: 0,
          issuedBy: user._id,
        });
      } else {
        response = await EditIssue({
          book: selectedBook._id,
          user: userData._id,
          issueDate: selectedIssue.issueDate,
          returnDate,
          rent:
            (moment(returnDate).diff(moment(), "days") + 1) *
            selectedBook?.rentPerDay,
          fine: 0,
          issuedBy: user._id,
          _id: selectedIssue._id,
        });
      }
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getData();
        setUserId("");
        setReturnDate("");
        setValidated(false);
        setErrorMessage("");
        setSelectedBook(null);
        setOpen(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (type === "edit") {
      validate();
    }
  }, [open]);

  // console.log(type);

  return (
    <Modal
      title=""
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-secondary issuebookheading ">
          {type === "edit" ? "Edit / Renew Issue" : "Issue Book"}
        </h1>
        <div className="d-flex justify-content-between align-self-center mb-2 ">
          <span>User Id </span>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User Id"
            disabled={type === "edit"} //In renew edit, we only change date not user
            className="w-75 p-1"
          />
        </div>
        <div className="d-flex justify-content-between align-self-center mb-2">
          <span>Return Date </span>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            placeholder="Return Date"
            min={moment().format("YYYY-MM-DD")}
            className="w-75 p-1"
          />
        </div>
        {errorMessage && <span className="error-message">{errorMessage}</span>}

        {validated && (
          <div className="validateduserdiv">
            <h1>User : {userData.name}</h1>
            <h1>
              Number Of Days : {moment(returnDate).diff(moment(), "days") + 1}
            </h1>
            <h1>Rent per Day : {selectedBook.rentPerDay}</h1>
            <h1>
              Rent:{" "}
              {(moment(returnDate).diff(moment(), "days") + 1) *
                (selectedBook?.rentPerDay || 0)}
            </h1>
          </div>
        )}
        <div className="d-flex justify-content-end gap-2 w-100 mt-3">
          <button
            onClick={() => setOpen(false)}
            className="btn btn-outline-warning"
          >
            Cancel
          </button>
          {type === "add" && (
            <button
              disabled={userId === "" || returnDate === ""}
              className={
                userId === "" || returnDate === ""
                  ? "btn btn-outline-secondary"
                  : "btn btn-outline-success"
              }
              style={{
                cursor:
                  userId === "" || returnDate === ""
                    ? "not-allowed"
                    : "default",
              }}
              onClick={validate}
            >
              Validate
            </button>
          )}

          {validated && (
            <button
              disabled={userId === "" || returnDate === ""}
              className="btn btn-success"
              onClick={onIssue}
            >
              {type === "edit" ? "Edit" : "Issue"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default IssueForm;
