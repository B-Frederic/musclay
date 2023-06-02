// Middleware Action
export const GET_STATS = 'GET_STATS';
export const getStats = () => ({
  type: GET_STATS,
});

// Reducer Action
export const SET_STATS = 'SET_STATS';
export const setStats = (stats) => ({
  type: SET_STATS,
  payload: stats,
});

// Reducer Action
export const RESET_STATS = 'RESET_STATS';
export const resetStats = () => ({
  type: RESET_STATS,
});


// Middleware Actions
export const CREATE_STATS = 'CREATE_STATS';
export const createStats = (stats) => ({
  type: CREATE_STATS,
  payload: stats,
});

// Reducer Action
export const SET_STATS_IS_LOADED = 'SET_STATS_IS_LOADED';
export const setStatsIsLoaded = (bool) => ({
  type: SET_STATS_IS_LOADED,
  payload: bool,
});
