import {
  SET_PLANNING,
  SET_LINK_TRAINING_PLANNING,
  SET_PLANNING_IS_LOADED,
  RESET_LINK_TRAINING_PLANNING,
} from '../actions/planning';

const initialState = {
  planning: [],
  relTrainingPlanning: [],
  isLoaded: false,
};

// eslint-disable-next-line default-param-last
const planningReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANNING:
      // eslint-disable-next-line no-case-declarations
      const planning = Object.keys(action.payload)
        .map((key) => action.payload[key]);
      return {
        ...state,
        planning: planning,
      };
    case SET_LINK_TRAINING_PLANNING:
      // eslint-disable-next-line no-case-declarations
      const relTrainingPlanning = Object.keys(action.payload)
        .map((key) => action.payload[key]);
      return {
        ...state,
        relTrainingPlanning: relTrainingPlanning,
      };
    case RESET_LINK_TRAINING_PLANNING:
      return {
        ...initialState,
      };
    case SET_PLANNING_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default planningReducer;
