import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";
import { usersSlice } from "./usersSlice";

const store = configureStore({
  reducer: {
    loading: loaderSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;
