import {
  SET_EXERCISES,
  SET_EXERCISES_IS_LOADED,
} from '../actions/exercises';

const initialState = {
  exercises: [],
  isLoaded: false,
};

// eslint-disable-next-line default-param-last
const exercisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXERCISES:
      // eslint-disable-next-line no-case-declarations
      const exercises = action.payload;
      // eslint-disable-next-line no-case-declarations
      const exercisesList = Object.keys(exercises)
        .map((key) => exercises[key]);
      return {
        ...state,
        exercises: exercisesList,
      };
    case SET_EXERCISES_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default exercisesReducer;
