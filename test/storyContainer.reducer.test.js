import { describe } from 'riteway';
import { handlePageReducer, initialState, setList, pageNext, pagePrevious } from '../src/reducers/storyContainer.reducer';

describe('storyContainer reducer', async assert => {

  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: handlePageReducer(),
      expected: initialState,
    });
  }

  // Using initialState.chunkSize so tests does not break when we change the CHUNK_SIZE const
  const fakeArray30 = [...Array(initialState.chunkSize + 10)];

  {
    assert({
      given: ['initial state', ' SET_LIST (list > CHUNK_SIZE)'],
      should: 'update bestStories list, islastPage: false',
      actual: handlePageReducer(undefined, setList(fakeArray30)),
      expected: { ...initialState, bestStories: fakeArray30, islastPage: false },
    });
  }

  // Double assertion testing not hardcoded and testing edge case we only get CHUNK_SIZE or lower number of posts
  const fakeArrayMaxChunk = [...Array(Math.floor((Math.random() * initialState.chunkSize) + 1))];

  {
    assert({
      given: ['initial state', ' SET_LIST (list <= CHUNK_SIZE)'],
      should: 'update bestStories list, isLastPage: true',
      actual: handlePageReducer(undefined, setList(fakeArrayMaxChunk)),
      expected: { ...initialState, bestStories: fakeArrayMaxChunk, islastPage: true },
    });
  }

  // Edge case UI is bug (show previous when first page)
  assert({
    given: ['initial state', ' PAGE_PREVIOUS'],
    should: 'not change page number',
    actual: handlePageReducer(undefined, pagePrevious()),
    expected: initialState,
  });

  const testPreviousPage = handlePageReducer({
    page: 1,
    bestStories: fakeArray30,
    chunkSize: initialState.chunkSize,
    islastPage: false,
  }, pagePrevious());

  assert({
    given: ['SET_LIST (list > CHUNK_SIZE)', ' page 1', ' PAGE_PREVIOUS'],
    should: 'change page number to 0',
    actual: testPreviousPage,
    expected: { ...testPreviousPage, page: 0 },
  });

  const fakeArray2pages = [...Array(initialState.chunkSize + initialState.chunkSize  * .5)];

  const testLastPage = handlePageReducer({
    page: 0,
    bestStories: fakeArray2pages,
    chunkSize: initialState.chunkSize,
    islastPage: false
  }, pageNext());

  assert({
    given: ['SET_LIST (list = CHUNK_SIZE + CHUNK_SIZE * .5)', ' page:0', ' PAGE_NEXT'],
    should: 'change page number to 1, isLastPage to true',
    actual: testLastPage,
    expected: { ...testLastPage, page: 1, islastPage: true },
  });

  // Edge case bestStories.length % initialState.chunkSize === 0
  // And double assertion test
  const fakeArray2pagesMax = [...Array(initialState.chunkSize * 3)];

  const testLastPage2 = handlePageReducer({
    page: 1,
    bestStories: fakeArray2pages,
    chunkSize: initialState.chunkSize,
    islastPage: false
  }, pageNext());

  assert({
    given: ['SET_LIST (list = CHUNK_SIZE * 2)', ' page:1', ' PAGE_NEXT'],
    should: 'change page number to 2, isLastPage to true',
    actual: testLastPage2,
    expected: { ...testLastPage, page: 2, islastPage: true },
  });


  const testNextPage = handlePageReducer({
    ...initialState,
    islastPage: true
  }, pageNext());

  assert({
    given: ['isLastPage: true', ' PAGE_NEXT'],
    should: 'not update page',
    actual: testNextPage.page,
    expected: initialState.page,
  });
});