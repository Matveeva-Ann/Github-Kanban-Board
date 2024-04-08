import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../types/board";

const initialState: Board[] = [];

const issuesDataSlice = createSlice({
  name: "issuesData",
  initialState: initialState,
  reducers: {
    addIssuesToTodo(state, action) {
      state[0].items = action.payload;
    },
    moveIssue(state, action) {           
      return [...action.payload];
    }
  },
});

export const { addIssuesToTodo, moveIssue } = issuesDataSlice.actions;

export const issuesDataReducer = issuesDataSlice.reducer;