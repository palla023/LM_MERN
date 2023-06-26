import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
};

export const loadersSlice = createSlice({
  name: "loaders",
  initialState,
  reducers: {
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = loadersSlice.actions;
