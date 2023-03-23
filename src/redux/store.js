import { configureStore } from "@reduxjs/toolkit";
import userNameReducer from "./userNameReducer";
import userImageReducer from "./userImageReducer";

const store = configureStore({
  reducer: {
    username: userNameReducer,
    userImage: userImageReducer,
  },
});

export default store;
