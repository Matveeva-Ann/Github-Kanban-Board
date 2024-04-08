import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { issuesDataReducer } from './issuesData';
import { urlParamsReducer } from './urlParams';

const persistConfig = {
  key: 'root',
  storage,
}

export const rootReducer = combineReducers({
  issuesData: issuesDataReducer,
  urlParams: urlParamsReducer,
});


export const persistedReducer = persistReducer(persistConfig, rootReducer)