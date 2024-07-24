/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItem: null,
};

export const orderSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setOrderItem: (state, action) => {
      state.orderItem = action.payload;
    },
  },
});

export const { setOrderItem } = orderSlice.actions;

export default orderSlice.reducer;
