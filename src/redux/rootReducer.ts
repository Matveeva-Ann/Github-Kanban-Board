import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { issuesDataReducer } from './issuesData';
import { urlParamsReducer } from './urlParams';
import { historyIssuesDataReducer } from './historyIssuesData';

const persistConfig = {
  key: 'root',
  storage,
}

export const rootReducer = combineReducers({
  issuesData: issuesDataReducer,
  urlParams: urlParamsReducer,
  historyIssuesData: historyIssuesDataReducer,
});


export const persistedReducer = persistReducer(persistConfig, rootReducer)