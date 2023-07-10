// Redux State - bookSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    totalPrice: 0,
    totalQuantity: 0, // New state field for total quantity
  },
  reducers: {
    addBook: (state, action) => {
      const existingBook = state.books.find((book) => book._id === action.payload._id);
      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        state.books.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice = calculateTotalPrice(state.books);
      state.totalQuantity = calculateTotalQuantity(state.books);
    },
    removeBook: (state, action) => {
      state.books = state.books.filter((book) => book._id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.books);
      state.totalQuantity = calculateTotalQuantity(state.books);
    },
    updateQuantity: (state, action) => {
      const { bookId, quantity } = action.payload;
      const book = state.books.find((book) => book._id === bookId);
      if (book) {
        book.quantity += quantity;
      }
      state.totalPrice = calculateTotalPrice(state.books);
      state.totalQuantity = calculateTotalQuantity(state.books);
    },
    setCartItems: (state, action) => {
      state.books = action.payload; // Assuming the payload is an array of cart items
      state.totalPrice = calculateTotalPrice(state.books);
      state.totalQuantity = calculateTotalQuantity(state.books);
    },
  },
});

const calculateTotalPrice = (books) => {
  let totalPrice = 0;
  books.forEach((book) => {
    totalPrice += book.Price * book.quantity;
  });
  return totalPrice;
};

const calculateTotalQuantity = (books) => {
  let totalQuantity = 0;
  books.forEach((book) => {
    totalQuantity += book.quantity;
  });
  return totalQuantity;
};

export const { addBook, removeBook, updateQuantity, setCartItems} = booksSlice.actions;

export default booksSlice.reducer;
