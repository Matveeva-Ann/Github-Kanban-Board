import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { HistoryIssuesState } from "../types/HistoryIssuesState";

export const initialStateHistory: HistoryIssuesState[]  = [];

const historyIssuesDataSlice = createSlice({
  name: "historyIssuesData",
  initialState: initialStateHistory,
  reducers: {
    addIssuesToHistory(state,  action: PayloadAction<HistoryIssuesState>) {
      if (!state.some(item => item.repoName === action.payload.repoName)) {
        return [ action.payload, ...state];
      }
      return state;
    },
    changeHistory(_, {payload}) {              
      return [...payload];
    },
  },
});

export const { addIssuesToHistory, changeHistory } = historyIssuesDataSlice.actions;

export const historyIssuesDataReducer = historyIssuesDataSlice.reducer;