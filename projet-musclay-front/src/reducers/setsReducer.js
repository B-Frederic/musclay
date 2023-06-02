import {
  SET_SETS,
  SET_SETS_IS_LOADED,
  RESET_SETS,
} from '../actions/sets';

const localSets = localStorage.getItem('sets') ? JSON.parse(localStorage.getItem('sets')) : {};

const initialState = {
  sets: localSets,
  isLoaded: false,
};

// eslint-disable-next-line default-param-last
const setsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETS:
      // eslint-disable-next-line no-case-declarations
      const sets = action.payload;
      return {
        ...state,
        sets: sets,
      };
    case RESET_SETS:
      return {
        ...initialState,
        sets: {},
      };
    case SET_SETS_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default setsReducer;
