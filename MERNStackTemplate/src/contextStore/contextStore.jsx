import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userStore";
import grantsReducer from "./grantsStore";

export default configureStore({
  reducer: {
    user: userReducer,
    grants: grantsReducer,
  }
});
