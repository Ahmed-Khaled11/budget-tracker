import { createSlice } from "@reduxjs/toolkit";

const clientSide = typeof window !== "undefined";
const initialState = {
  items: clientSide
    ? localStorage.getItem("itemList")
      ? JSON.parse(localStorage.getItem("itemList"))
      : []
    : [],
};
export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = [...state.items, action.payload];
      // add item to localStorage
      localStorage.setItem("itemList", JSON.stringify(state.items));

    },
    updateItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, updateItems,  } = itemSlice.actions;
export default itemSlice.reducer;
