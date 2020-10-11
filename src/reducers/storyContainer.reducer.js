import { CHUNK_SIZE, HN_MAX_STORY } from '../constant';

// Probably not necessary to have CHUNK_SIZE in the state since it's a constant, but it makes tests consistent
const initialState = {
  page: 0,
  bestStories: [],
  chunkSize: CHUNK_SIZE,
  islastPage: true,
};

const setList = (payload) => ({
  type: 'SET_LIST',
  payload: payload,
});

const pageNext = () => ({
  type: 'PAGE_NEXT',
});

const pagePrevious = () => ({
  type: 'PAGE_PREVIOUS',
});

const handlePageReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case setList().type:
      return {
        ...state,
        bestStories: payload,
        islastPage: payload.length <= state.chunkSize,
      };
    case pageNext().type:
      let lastPage;

      if(state.islastPage) lastPage = true;
      else lastPage = (state.page + 1) * state.chunkSize + state.chunkSize >= state.bestStories.length;

      return {
        ...state,
        page: state.islastPage ? state.page : state.page + 1,
        islastPage: lastPage
      };
    case pagePrevious().type:
      return {
        ...state,
        page: state.page === 0 ? 0 : state.page - 1,
        islastPage: state.page > 0 ? false : state.islastPage
      };
    default:
      return { ...state };
  }
};


export {
  initialState, handlePageReducer, setList, pageNext, pagePrevious
};