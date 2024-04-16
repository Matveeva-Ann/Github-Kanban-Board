import { createSlice } from '@reduxjs/toolkit';

export const initialStateUrlParam: Array<string> = [''];

const urlParamsSlice = createSlice({
  name: 'urlParams',
  initialState: initialStateUrlParam,
  reducers: {
    setUrlParamsRedux(_, action) {
      return [...action.payload];
    },
  },
});

export const { setUrlParamsRedux } = urlParamsSlice.actions;

export const urlParamsReducer = urlParamsSlice.reducer;
