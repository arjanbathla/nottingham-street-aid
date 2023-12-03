import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userStore";
import grantsReducer from "./grantsStore";
import grantReducer from "./grantStore";
import adminReducer from "./adminStore";

export default configureStore({
  reducer: {
    user: userReducer,
    grants: grantsReducer,
    grant: grantReducer,
    admin: adminReducer,
  }
});
