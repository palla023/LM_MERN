import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
  user: null,
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    SetUsers: (state, action) => {
      state.users = action.payload;
    },
    SetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { SetUsers, SetUser } = usersSlice.actions;
