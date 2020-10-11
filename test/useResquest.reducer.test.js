import { describe } from 'riteway';

import { dataFetchReducer, initialState, fetchFailure, fetchSuccess } from '../src/reducer/useResquest.reducer';

describe('UseRequest reducers', async assert => {

  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: dataFetchReducer(),
      expected: initialState
    });
  }

  assert({
    given: 'initial state and request failed',
    should: 'change loading to false and error to true',
    actual: dataFetchReducer(undefined, fetchFailure()),
    expected: { ...initialState, loading: false, error: true }
  });

  const data = [1,2,3];

  assert({
    given: 'initial state and request success',
    should: 'change loading to false and add data',
    actual: dataFetchReducer(undefined, fetchSuccess(data)),
    expected: { ...initialState, loading: false, data: data }
  });
});