import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: localStorage.getItem("Admin")
    ? JSON.parse(localStorage.getItem("Admin"))
    : null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("Admin", JSON.stringify(action.payload));
    },
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("Admin");
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
