import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Add an item to the cart
export const addToCart = async (bookId, userId) => {
  try {
    const payload = { bookId, userId };
    const response = await axios.post(`${API_BASE_URL}/api/cart/add`, payload, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update the quantity of a cart item
export const updateCartItemQuantity = async (cartItemId, quantity) => {
  try {
    const payload = { quantity };
    const response = await axios.put(
      `${API_BASE_URL}/api/cart/update/${cartItemId}`,
      payload,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//  decrease item quantity
export const decreaseCartItemQuantity = async (cartItemId, quantity) => {
  try {
    const payload = { quantity };
    const response = await axios.put(
      `${API_BASE_URL}/api/cart/decreaseQuantity/${cartItemId}`,
      payload,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Get cart items by user
export const getCartItemsByUser = async (userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/cart/user`, { userId },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



// Remove a cart item
export const removeCartItem = async (cartItemId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/cart/remove/${cartItemId}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
