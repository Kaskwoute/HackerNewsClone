const initialState = {
  loading: false,
  error: false,
  data: undefined,
};

const fetchSuccess = (payload) => ({
  type: 'FETCH_SUCCESS',
  payload: payload
});

const fetchFailure = () => ({
  type: 'FETCH_FAILURE',
});

const initFetch = () => ({
  type: 'FETCH_INIT',
});

const dataFetchReducer = (state = initialState, { payload, type } = {}) => {
  switch (type) {
    case initFetch().type:
      return {
        ...state,
        loading: true,
      };
    case fetchSuccess().type:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload
      };
    case fetchFailure().type:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return { ...state };
  }
};

export {
  dataFetchReducer, fetchSuccess, fetchFailure, initialState, initFetch
}