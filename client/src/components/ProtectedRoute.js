/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { GetLoggedInUserDetails } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import "./ProtectedRoute.css";
import { getCartItemsByUser } from "../apicalls/cartItems";
import { setCartItems } from "../redux/bookSlice";
import { message } from "antd";

const ProtectedRoute = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const user = useSelector((state) => state.users.user);
  const userId = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadCartItems = async () => {
    try {
      const response = await getCartItemsByUser(userId);
      setCartItems(response);
      // Calculate cart quantity and price
      let quantity = 0;
      let price = 0;
      response.forEach((item) => {
        quantity += item.quantity;
        price += item.bookId.Price * item.quantity;
      });
      setCartQuantity(quantity);
    } catch (error) {
      message.error(error.message);
    }
  };

  const validateUserToken = async () => {
    try {
      dispatch(ShowLoading());
      const userDetails = await GetLoggedInUserDetails();
      dispatch(HideLoading());
      dispatch(SetUser(userDetails));
    } catch (error) {
      navigate('/login');
      dispatch(HideLoading());
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      validateUserToken();
    }
  }, []);

  useEffect(() => {
    loadCartItems();
  }, [userId, cartItems]);

  if (!user) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading user details...</p>
      </div>
    );
  }
  return (
    <div>
      {user && (
        <div className="p-1">
          <div className="header">
            <h1
              className="headerText align-items-center"
              onClick={() => navigate("/")}
            >
              {" "}
              LIBRARY MANAGEMENT APP
            </h1>

            <div className="d-flex justify-content-between align-items-center gap-2 ">
              <div className="d-flex align-items-center gap-1 bg-white headerRight">
                <i className="ri-shield-user-line"></i>
                <span
                  className="text-sm underline "
                  onClick={() => navigate("/profile")}
                >
                  {user.name.toUpperCase()}
                </span>
                <i
                  className="ri-logout-box-r-line"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                ></i>
              </div>
              <div className="cart-icon me-2" onClick={() => navigate("/cart")}>
                <i className="ri-shopping-cart-2-line"></i>
                <span className="cart-count">{cartQuantity? cartQuantity:0}</span>
              </div>
            </div>
          </div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
