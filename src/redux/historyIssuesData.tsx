import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { HistoryIssuesState } from "../types/HistoryIssuesState";

const initialState: HistoryIssuesState[]  = [];

const historyIssuesDataSlice = createSlice({
  name: "historyIssuesData",
  initialState: initialState,
  reducers: {
    addIssuesToHistory(state,  action: PayloadAction<HistoryIssuesState>) {
      if (!state.some(item => item.repoName === action.payload.repoName)) {
        return [...state, action.payload];
      }
      return state;
    },
    changeHistory(state, {payload}) {        
      return [...payload];
    },
  },
});

export const { addIssuesToHistory, changeHistory } = historyIssuesDataSlice.actions;

export const historyIssuesDataReducer = historyIssuesDataSlice.reducer;