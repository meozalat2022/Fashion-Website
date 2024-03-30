import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";

const store = configureStore({
  reducer: {
    loading: loaderSlice.reducer,
  },
});

export default store;
