/**
 * @description: We loose ability to update comments count like this for better perf
 * @description: Struct is better for lookup and since we don't need to loop over all data we don't need array
 * @description: Cached is infinite, not suitable for real life
 */
const initialState = {
  cachedStruct: {},
  displayed: [],
};

const pushDisplayed = (payload) => ({
  type: 'PUSH_DISPLAYED',
  payload: payload,
});

// This is badly worded but we don't want to update cachedStruct
// when data is coming from cachedStruct
// we only update displayed with this
const updateDisplayed = (payload) => ({
  type: 'UPDATE_DISPLAYED',
  payload: payload,
});

const resetDisplayed = () => ({
  type: 'RESET_DISPLAYED'
});

const handleListReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case pushDisplayed().type:

      const toObject = payload.reduce((accumulator, story) => {
        accumulator[story.id] = story;

        return accumulator;
      }, {});

      return {
        ...state,
        cachedStruct: {
          ...state.cachedStruct,
          ...toObject,
        },
        displayed: [
          ...state.displayed,
          ...payload,
        ]
      };
    case updateDisplayed().type:
      return {
        ...state,
        displayed: [
          ...state.displayed,
          ...payload,
        ]
      };
    case resetDisplayed().type:
      return {
        ...state,
        displayed: []
      };
    default:
      return { ...state };
  }
};

export {
  initialState, handleListReducer, pushDisplayed, updateDisplayed, resetDisplayed
}