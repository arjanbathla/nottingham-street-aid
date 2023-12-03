import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grant: null,
};

export const grantSlice = createSlice({
  name: "grant",
  initialState,
  reducers: {
    setGrant: (state, action) => {
      state.grant = action.payload;
    },
  },
});

export const { setGrant } = grantSlice.actions;
export default grantSlice.reducer;
