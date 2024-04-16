import { historyIssuesDataReducer, initialStateHistory } from '../redux/historyIssuesData';
import { issuesDataReducer, initialState } from '../redux/issuesData';
import { initialStateUrlParam, urlParamsReducer } from '../redux/urlParams';

describe('initial state', () => {
  test('check initial state of issuesDataReducer', () => {
    const action = { type: 'unknown', payload: [] }; 
    const state = issuesDataReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  test('Check initial state of historyIssuesDataReducer', () => {
    const action = { type: 'unknown', payload: {} }; 
    const state = historyIssuesDataReducer(undefined, action);
    expect(state).toEqual(initialStateHistory);
  });

  test('Check initial state of urlParamsReducer', () => {
    const action = { type: 'unknown', payload: {} }; 
    const state = urlParamsReducer(undefined, action);
    expect(state).toEqual(initialStateUrlParam);
  });
});
