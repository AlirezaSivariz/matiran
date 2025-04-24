// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import ratesReducer from "./slice/ratesSlice";

export const store = configureStore({
  reducer: {
    rates: ratesReducer,
  },
});
