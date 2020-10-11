import { describe } from 'riteway';

import { dataFetchReducer, initialState, fetchFailure, fetchSuccess, initFetch } from '../src/reducers/useResquest.reducer';

describe('UseRequest reducer', async assert => {

  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: dataFetchReducer(),
      expected: initialState,
    });
  }

  {
    assert({
      given: 'initial state and init fetch',
      should: 'change loading state to true',
      actual: dataFetchReducer(undefined, initFetch()),
      expected: { ...initialState, loading: true },
    });
  }

  assert({
    given: 'initial state and request failed',
    should: 'change loading to false and error to true',
    actual: dataFetchReducer(undefined, fetchFailure()),
    expected: { ...initialState, loading: false, error: true },
  });

//  const data = [1, 2, 3];
//
//  assert({
//    given: 'initial state and request success',
//    should: 'change loading to false and add data',
//    actual: dataFetchReducer(undefined, fetchSuccess(data)),
//    expected: { ...initialState, loading: false, data: data },
//  });
});