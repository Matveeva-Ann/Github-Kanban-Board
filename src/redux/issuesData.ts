import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../types/board";
import { Issue } from "../types/Issue";

export const initialState: Board[] = [
  {
    id: 0,
    items: [] as Issue[],
    name: 'Todo',
    repoName: 'RepoName',
  }
];

const issuesDataSlice = createSlice({
  name: "issuesData",
  initialState: initialState,
  reducers: {
    addIssuesToTodo(state, {payload}) {
      console.log(payload);
      state[0].items = [...payload.data];
      state[0].repoName = payload.param;
    },
    moveIssue(_, action) {  
      return [...action.payload];
    }
  },
});

export const { addIssuesToTodo, moveIssue } = issuesDataSlice.actions;

export const issuesDataReducer = issuesDataSlice.reducer;