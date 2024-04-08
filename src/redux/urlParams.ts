import { createSlice } from '@reduxjs/toolkit';

const initialState: Array<string> = [''];

const urlParamsSlice = createSlice({
  name: 'urlParams',
  initialState,
  reducers: {
    setUrlParamsRedux(state, action) {
      return [...action.payload];
    },
  },
});

export const { setUrlParamsRedux } = urlParamsSlice.actions;

export const urlParamsReducer = urlParamsSlice.reducer;
