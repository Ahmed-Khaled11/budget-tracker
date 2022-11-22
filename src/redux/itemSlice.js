import { createSlice } from "@reduxjs/toolkit";

const clientSide = typeof window !== "undefined";
const initialState = {
  items: clientSide
    ? localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : []
    : [],
  isActive:false
};
export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = [...state.items, action.payload];
      // add item to localStorage
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    updateItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, updateItems } = itemsSlice.actions;
export default itemsSlice.reducer;
