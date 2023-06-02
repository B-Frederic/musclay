import {
  SET_TRAININGS_IS_LOADED,
  SET_TRAININGS,
  SET_TAGS,
  SET_CREATED_TRAININGS,
  RESET_TRAININGS,
} from '../actions/trainingsList';

const localTrainings = localStorage.getItem('trainings') ? JSON.parse(localStorage.getItem('trainings')) : [];

const initialState = {
  trainings: localTrainings,
  tags: [],
  createdTraining: {},
  isLoaded: false,
};

// eslint-disable-next-line default-param-last
const trainingsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRAININGS:
      // eslint-disable-next-line no-case-declarations
      const trainings = action.payload;
      // eslint-disable-next-line no-case-declarations
      const trainingsList = Object.keys(trainings)
        .map((key) => trainings[key]);
      return {
        ...state,
        trainings: trainingsList,
      };
    case RESET_TRAININGS:
      return {
        ...initialState,
        trainings: [],
      };
    case SET_TRAININGS_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    case SET_TAGS:
      // console.log(tags);
      return {
        ...state,
        tags: action.payload,
      };
    case SET_CREATED_TRAININGS:
      return {
        ...state,
        createdTraining: action.payload,
      };
    default:
      return state;
  }
};

export default trainingsListReducer;
