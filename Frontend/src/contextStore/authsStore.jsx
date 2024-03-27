import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auths: [],
};

export const authsSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    setAuths: (state, action) => {
      console.log('action', action)
      state.auths = action.payload.auths;
    },
  },
});

export const selectAuths = (state) => state.auths;
export const { setAuths } = authsSlice.actions;
export default authsSlice.reducer;
