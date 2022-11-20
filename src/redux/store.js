import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./taskSlice";
export const store = configureStore({
  reducer: {
    tasks: itemSlice,
  },
});
