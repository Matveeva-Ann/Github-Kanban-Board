import { issuesDataReducer, initialState, addIssuesToTodo } from '../redux/issuesData';

describe('issuesDataSlice reducer', () => {
  test('should add issues to todo list', () => {
    const todoData = {
      data:  [],
      param: 'repoName/react'
    };

    const action = addIssuesToTodo(todoData);
    const state = issuesDataReducer(initialState, action);
    expect(state[0].items).toEqual(todoData.data);
    expect(state[0].repoName).toEqual(todoData.param);
  });
});