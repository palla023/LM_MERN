import React from "react";
import { Tabs } from "antd";
import Books from "./Books/Books.js";
import Users from "./Users/Users.js";
import Reports from "./Reports/Reports.js";
import BasicDetails from "./BasicDetails/BasicDetails.js";
import BorrowedBooks from "./BorrowedBooks/BorrowedBooks.js";
import { useSelector } from "react-redux";
const TabPane = Tabs.TabPane;

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  const role = user.role;
  return (
    <div className="">
      <Tabs defaultActiveKey="1">
        <TabPane tab="General" key="1">
          <BasicDetails />
        </TabPane>

        {role === "user" && (
          <TabPane tab="Books Borrowed" key="2">
            <BorrowedBooks />
          </TabPane>
        )}

        {role !== "user" && (
          <TabPane tab="Books" key="3">
            <Books />
          </TabPane>
        )}
        {role !== "user" && (
          <TabPane tab="Users" key="4">
            <Users role="user" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Librarians" key="5">
            <Users role="librarian" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Admins" key="6">
            <Users role="admin" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Reports" key="7">
            <Reports />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default Profile;
