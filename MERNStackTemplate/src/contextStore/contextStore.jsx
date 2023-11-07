import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userStore";
import grantsReducer from "./grantsStore";
import grantReducer from "./grantStore";

export default configureStore({
  reducer: {
    user: userReducer,
    grants: grantsReducer,
    grant: grantReducer,
  }
});
