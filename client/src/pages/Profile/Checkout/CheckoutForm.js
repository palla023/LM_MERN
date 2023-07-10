/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CheckoutForm.css";
import { useNavigate } from "react-router-dom";
import { removeBook, updateQuantity } from "../../../redux/bookSlice";
import {
  addToCart,
  removeCartItem,
  getCartItemsByUser,
  decreaseCartItemQuantity,
} from "../../../apicalls/cartItems";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { message } from "antd";

const CheckoutForm = () => {
  const user = useSelector((state) => state.users.user);
  const userId = user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  const handleIncreaseQuantity = async (bookId) => {
    try {
      await addToCart(bookId, userId);
      dispatch(updateQuantity({ bookId, quantity: 1 }));
      loadCartItems(); // Refresh cart items after updating quantity
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleDecreaseQuantity = async (bookId) => {
    try {
      const cartItem = cartItems.find((item) => item.bookId._id === bookId);
      if (!cartItem) {
        return;
      }
  
      if (cartItem.quantity === 1) {
        dispatch(removeBook(bookId));
        await removeCartItem(cartItem._id);
        loadCartItems();
      } else if (cartItem.quantity > 1) {
        await decreaseCartItemQuantity(cartItem._id);
        dispatch(updateQuantity({ bookId, quantity: cartItem.quantity - 1 }));
        loadCartItems();
      }
    } catch (error) {
      console.error("Failed to decrease item quantity:", error);
    }
  };
  

  const loadCartItems = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getCartItemsByUser(userId);
      dispatch(HideLoading());
      setCartItems(response);

      // Calculate cart quantity and price
      let quantity = 0;
      let price = 0;
      response.forEach((item) => {
        quantity += item.quantity;
        price += item.bookId.Price * item.quantity;
      });
      setCartQuantity(quantity);
      setCartPrice(price);
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  return (
    <div>
      <div className="card shadow m-5">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center border border-secondary p-2"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <i className="ri-arrow-left-line"></i>
              <h5 className="ms-2 align-items-center mt-1">
                Continue Shopping
              </h5>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h5>Items: {cartQuantity}</h5>
            <h5>Total Price: Rs. {cartPrice}</h5>
            <button className="btn btn-success">Checkout</button>
          </div>
        </div>
      </div>

      <div className="card shadow m-5">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-light">
                <tr className="text-center">
                  <th></th>
                  <th>Book</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => (
                  <tr key={cartItem._id} className="align-middle text-center">
                    <td>
                      <img
                        src={cartItem.bookId.image}
                        alt="book"
                        className="checkoutImage"
                      />
                    </td>
                    <td>{cartItem.bookId.title}</td>
                    <td>Rs. {cartItem.bookId.Price}</td>
                    <td>
                      <div className="d-flex flex-row align-items-center justify-content-center gap-1">
                        <span>{cartItem.quantity}</span>
                        <span className="d-flex flex-column">
                          <i
                            className="ri-arrow-drop-up-fill iconChange"
                            onClick={() =>
                              handleIncreaseQuantity(cartItem.bookId._id)
                            }
                          ></i>
                          <i
                            className="ri-arrow-drop-down-fill iconChange iconHeightAdj"
                            onClick={() =>
                              handleDecreaseQuantity(cartItem.bookId._id)
                            }
                          ></i>
                        </span>
                      </div>
                    </td>
                    <td>Rs. {cartItem.bookId.Price * cartItem.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
