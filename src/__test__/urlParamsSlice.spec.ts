import { setUrlParamsRedux, urlParamsReducer, initialStateUrlParam } from '../redux/urlParams';

describe('urlParamsSlice reducer', () => {
  test('should set URL params correctly', () => {
    const params = ['param1', 'param2'];
    const action = setUrlParamsRedux(params);
    const state = urlParamsReducer(initialStateUrlParam, action);
    expect(state).toEqual(params);
  });
});
