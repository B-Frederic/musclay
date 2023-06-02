import {
  SET_STATS,
  SET_STATS_IS_LOADED,
  RESET_STATS,
} from '../actions/userStats';

const initialState = {
  stats: [],
  isLoaded: false,
};

const userStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATS:
      const stats = action.payload;
      const statsArray = Object.keys(stats).map((key) => stats[key]);
      return {
        ...state,
        stats: statsArray,
      };
    case RESET_STATS:
      return {
        ...initialState,
        stats: [],
      };
    case SET_STATS_IS_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default userStatsReducer;
