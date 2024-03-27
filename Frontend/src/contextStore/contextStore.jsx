import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userStore";
import grantsReducer from "./grantsStore";
import grantReducer from "./grantStore";
import adminReducer from "./adminStore";
import authsReducer from "./authsStore";

export default configureStore({
  reducer: {
    user: userReducer,
    grants: grantsReducer,
    grant: grantReducer,
    admin: adminReducer,
    auths: authsReducer,
  }
});
