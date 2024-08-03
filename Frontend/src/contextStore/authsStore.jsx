import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auths: [],
};

export const authsSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    setAuths: (state, action) => {
      state.auths = action.payload;
    },
    updateAuth: (state, action) => {
      state.auths = state.auths.map(auth =>
        auth._id === action.payload._id ? action.payload : auth
      );
    },
  },
});

export const selectAuths = (state) => state.auths.auths;
export const { setAuths, updateAuth } = authsSlice.actions;
export default authsSlice.reducer;
