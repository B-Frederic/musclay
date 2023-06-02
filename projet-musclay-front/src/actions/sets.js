// Middleware Actions
export const GET_SETS = 'GET_SETS';
export const getSets = () => ({
  type: GET_SETS,
});

// Reducer Action
export const SET_SETS = 'SET_SETS';
export const setSets = (sets) => ({
  type: SET_SETS,
  payload: sets,
});

// Reducer Action
export const RESET_SETS = 'RESET_SETS';
export const resetSets = () => ({
  type: RESET_SETS,
});

// Reducer Action
export const SET_SETS_IS_LOADED = 'SET_SETS_IS_LOADED';
export const setSetsIsLoaded = (bool) => ({
  type: SET_SETS_IS_LOADED,
  payload: bool,
});

// Middleware Actions
export const CREATE_SETS = 'CREATE_SETS';
export const createSets = (trainingId, sets) => ({
  type: CREATE_SETS,
  payload: {
    id: trainingId,
    sets: sets,
  },
});

// Middleware Actions
export const UPDATE_SETS = 'UPDATE_SETS';
export const updateSets = (trainingId, sets, deleteSets) => ({
  type: UPDATE_SETS,
  payload: {
    id: trainingId,
    sets: sets,
    deleteSets: deleteSets,
  },
});
