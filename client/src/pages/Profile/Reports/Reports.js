/* eslint-disable react-hooks/exhaustive-deps */
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetReports } from "../../../apicalls/reports";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

const Reports = () => {
  const [reports, setReports] = useState(null);
  const dispatch = useDispatch();
  const getReports = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetReports();
      dispatch(HideLoading());
      if (response.success) {
        setReports(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getReports();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row text-center">
                <div className="col-sm-12">
                  <h3 className="text-secondary text-uppercase text-monospace mt-2">
                    Users
                  </h3>
                </div>
                <hr />
                <div className="col-sm-6">
                  <p className="mb-0">Total Users</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.users?.totalUsersCount}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Users</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.users?.usersCount}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Librarians</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.users?.librariansCount}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Admins</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.users?.adminsCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-4">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row text-center">
                <div className="col-sm-12">
                  <h3 className="text-muted mb-0">Books</h3>
                </div>
                <hr />
                <div className="col-sm-6">
                  <p className="mb-0">Total Copies</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.books?.totalBooksCopiesCount}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Available Copies</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.books?.availableBooksCopiesCount}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Issued Copies</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.books?.issuesBooksCopiesCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row text-center">
                <div className="col-sm-12">
                  <h3 className="text-secondary text-uppercase text-monospace mt-2">
                    Issues
                  </h3>
                </div>
                <hr />
                <div className="col-sm-6">
                  <p className="mb-0">Total Issues</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.issues?.issuesCount}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Returned Issues</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.issues?.returnedIssuesCount}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Pending Issues</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.issues?.pendingIssuesCount}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Overdue Issues</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    {reports?.issues?.overdueIssuesCount || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row text-center">
                <div className="col-sm-12">
                  <h3 className="text-secondary text-uppercase text-monospace mt-2">
                    Revenue
                  </h3>
                </div>
                <hr />
                <div className="col-sm-6">
                  <p className="mb-0">Total Revenue</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                    &#8377;{reports?.revenue?.totalCollected}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Rent Collected</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                  &#8377;{reports?.revenue?.rentCollected}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Penalty Collected</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                  &#8377;{reports?.revenue?.fineCollected}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-sm-6">
                  <p className="mb-0">Rent Pending</p>
                </div>
                <div className="col-sm-5">
                  <p className="text-muted mb-0">
                  &#8377;{reports?.revenue?.rentPending}
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

export default Reports;
