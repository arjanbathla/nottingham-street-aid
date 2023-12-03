import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grants: null,
};

export const grantsSlice = createSlice({
  name: "grants",
  initialState,
  reducers: {
    setGrants: (state, action) => {
      state.grants = action.payload;
    },
  },
});

export const { setGrants } = grantsSlice.actions;
export default grantsSlice.reducer;
