import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "ToDo",
    items: [],
    id: 1,
  },
  {
    name: "InProgress",
    items: [],
    id: 2,
  },
  {
    name: "Done",
    items: [],
    id: 3,
  },
];

const issuesDataSlice = createSlice({
  name: "issuesData",
  initialState: initialState,
  reducers: {
    addIssuesToTodo(state, action) {
      state[0].items = action.payload;
    },
    moveIssue(state, action) {
      const { items } = action.payload;
      return items ? [...items] :[...action.payload];
    }
  },
});

export const { addIssuesToTodo, moveIssue } = issuesDataSlice.actions;

export const issuesDataReducer = issuesDataSlice.reducer;