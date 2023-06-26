import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const BasicDetails = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-4 ">
          <img
            src="data:image/png;base64,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"
            alt=""
            className="w-100 h-100"
          />
        </div>
        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <p className="mb-0">Name</p>
                </div>
                <div className="col-sm-6">
                  <p className="text-muted mb-0">{user.name}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-6">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-6">
                  <p className="text-muted mb-0">{user.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-6">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-6">
                  <p className="text-muted mb-0">{user.phone}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-6">
                  <p className="mb-0">Role</p>
                </div>
                <div className="col-sm-6">
                  <p className="text-muted mb-0">{user.role}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-6">
                  <p className="mb-0">Registered On</p>
                </div>
                <div className="col-sm-6">
                  <p className="text-muted mb-0">
                    {moment(user.createdAt).format("MMM Do YYYY, h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
