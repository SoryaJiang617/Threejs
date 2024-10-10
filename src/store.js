import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/api";

const galleryReducer = (state = {}, action) => state;

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
