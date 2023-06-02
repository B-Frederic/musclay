// Middleware Actions
export const GET_PLANNING = 'GET_PLANNING';
export const getPlanning = () => ({
  type: GET_PLANNING,
});

// Reducer Action
export const SET_PLANNING = 'SET_PLANNING';
export const setPlanning = (planning) => ({
  type: SET_PLANNING,
  payload: planning,
});

export const SET_PLANNING_IS_LOADED = 'SET_PLANNING_IS_LOADED';
export const setPlanningIsLoaded = (bool) => ({
  type: SET_PLANNING_IS_LOADED,
  payload: bool,
});

// Middleware Actions
export const GET_LINK_TRAINING_PLANNING = 'GET_LINK_TRAINING_PLANNING';
export const getLinkPlanning = () => ({
  type: GET_LINK_TRAINING_PLANNING,
});

// Reducer Action
export const SET_LINK_TRAINING_PLANNING = 'SET_LINK_TRAINING_PLANNING';
export const setLinkPlanning = (relTrainingPlanning) => ({
  type: SET_LINK_TRAINING_PLANNING,
  payload: relTrainingPlanning,
});

// Reducer Action
export const RESET_LINK_TRAINING_PLANNING = 'RESET_LINK_TRAINING_PLANNING';
export const resetLinkPlanning = () => ({
  type: RESET_LINK_TRAINING_PLANNING,
});

// Middleware Actions
export const CREATE_LINK_TRAINING_PLANNING = 'CREATE_LINK_TRAINING_PLANNING';
export const createLinkTrainingPlanning = (relTrainingPlanning) => ({
  type: CREATE_LINK_TRAINING_PLANNING,
  payload: relTrainingPlanning,
});

// Middleware Actions
export const UPDATE_LINK_TRAINING_PLANNING = 'UPDATE_LINK_TRAINING_PLANNING';
export const updateLinkTrainingPlanning = (relTrainingPlanning) => ({
  type: UPDATE_LINK_TRAINING_PLANNING,
  payload: relTrainingPlanning,
});
