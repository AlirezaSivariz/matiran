import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  crypto: "bitcoin",
  lastUpdated: null,
};

const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    setRates: (state, action) => {
      state.data = action.payload.data;
      state.crypto = action.payload.crypto;
      state.lastUpdated = action.payload.time;
    },
  },
});

export const { setRates } = ratesSlice.actions;
export default ratesSlice.reducer;
