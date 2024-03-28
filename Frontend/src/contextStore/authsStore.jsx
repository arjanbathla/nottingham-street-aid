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
      console.log('updateAuth', action.payload)
    },
  },
});

export const selectAuths = (state) => state.auths.auths;
export const { setAuths, updateAuth } = authsSlice.actions;
export default authsSlice.reducer;
