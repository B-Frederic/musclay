// Middleware Actions
export const GET_EXERCISES = 'GET_EXERCISES';
export const getExercises = () => ({
  type: GET_EXERCISES,
});

// Reducer Action
export const SET_EXERCISES = 'SET_EXERCISES';
export const setExercises = (exercises) => ({
  type: SET_EXERCISES,
  payload: exercises,
});

// Reducer Action
export const SET_EXERCISES_IS_LOADED = 'SET_EXERCISES_IS_LOADED';
export const setExercisesIsLoaded = (bool) => ({
  type: SET_EXERCISES_IS_LOADED,
  payload: bool,
});
