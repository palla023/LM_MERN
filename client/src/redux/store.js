import { configureStore } from "@reduxjs/toolkit";
import { loadersSlice } from "./loadersSlice";
import { usersSlice } from "./usersSlice";
import { booksSlice } from "./bookSlice";



export const store = configureStore({
  reducer: {
    loaders: loadersSlice.reducer,
    users: usersSlice.reducer,
    books: booksSlice.reducer
  },
});
