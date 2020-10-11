import { describe } from 'riteway';
import { initialState, handleListReducer, pushDisplayed, updateDisplayed, resetDisplayed } from '../src/reducers/storyList.reducer';
import { test1 } from './mockHNstory';

describe('storyList reducer', async assert => {
  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: handleListReducer(),
      expected: initialState,
    });
  }

  {
    assert({
      given: ['an initial state', 'dispatch PUSH_DISPLAYED'],
      should: [' update cachedStruct', ' update displayed'],
      actual: handleListReducer(undefined, pushDisplayed(test1)),
      expected: {
        cachedStruct: {
          8863: test1[0]
        },
        displayed: test1
      },
    });
  }

  {
    assert({
      given: ['an initial state', 'dispatch PUSH_DISPLAYED'],
      should: [' update cachedStruct', ' update displayed'],
      actual: handleListReducer(undefined, pushDisplayed(test1)),
      expected: {
        ...initialState,
        cachedStruct: {
          8863: test1[0]
        },
        displayed: test1
      },
    });
  }

  {
    assert({
      given: ['an initial state', 'dispatch UPDATE_DISPLAYED'],
      should: ['update displayed'],
      actual: handleListReducer(undefined, updateDisplayed(test1)),
      expected: {
        ...initialState,
        displayed: test1
      },
    });
  }

  const testReset = handleListReducer(undefined, pushDisplayed(test1));

  {
    assert({
      given: ['displayed list', 'dispatch RESET_DISPLAYED'],
      should: ['reset displayed'],
      actual: handleListReducer(testReset, resetDisplayed()),
      expected: {
        ...testReset,
        displayed: []
      },
    });
  }
});