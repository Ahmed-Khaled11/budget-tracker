import { createSlice } from "@reduxjs/toolkit";

const clientSide = typeof window !== "undefined";
const initialState = {
  item: clientSide
    ? localStorage.getItem("itemList")
      ? JSON.parse(localStorage.getItem("itemList"))
      : []
    : [],
};

export const itemSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.item = [...state.item, action.payload];
      // add item to localStorage
      localStorage.setItem("itemList", JSON.stringify(state.item));
    },
    updateItems: (state, action) => {
    state.item = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { addItem, updateItems } = itemSlice.actions;

export default itemSlice.reducer;
