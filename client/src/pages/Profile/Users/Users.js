/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  GetAllUsers,
  updateUserRole,
} from "../../../apicalls/users.js";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice.js";
import IssuedBooks from "./IssuedBooks.js";
import { message } from "antd";
import './users.css'

const Users = ({ role }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      dispatch(HideLoading());
      setUsers(response.users);
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      dispatch(ShowLoading());
      await updateUserRole(userId, newRole);
      dispatch(HideLoading());
      message.success("Role updated successfully");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      getUsers(); // Fetch the updated list of users
    } catch (error) {
      dispatch(HideLoading());
      message.error("Failed to update role");
      console.error("Failed to update role:", error);
    }
  };
  
  

  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>createdAt</th>
              <th>Actions</th>
              <th>Change Role</th>
            </tr>
          </thead>
          {users ? (
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="align-middle">
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{moment(user.createdAt).format("DD-MM-YYYY")}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowIssuedBooks(true);
                      }}
                    >
                      Books
                    </button>
                  </td>
                  <td className='box'>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="user">User</option>
                      <option value="librarian">Librarian</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p>Loading users...</p>
          )}
        </table>
        {showIssuedBooks && (
          <IssuedBooks
            showIssuedBooks={showIssuedBooks}
            setShowIssuedBooks={setShowIssuedBooks}
            selectedUser={selectedUser}
          />
        )}
      </div>
    </>
  );
};

export default Users;
