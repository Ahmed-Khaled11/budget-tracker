import { createSlice } from "@reduxjs/toolkit";

const clientSide = typeof window !== "undefined";
const initialState = {
  tasks: clientSide
    ? localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
    : [],
  isActive:false
};
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
      // add item to localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask, updateTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
