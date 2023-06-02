/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import {
  GET_EXERCISES,
  setExercises,
  setExercisesIsLoaded,
} from '../actions/exercises';

const backUrl = process.env.REACT_APP_BACK_URL;

const exercisesMiddleware = (store) => (next) => (action) => {
  const { token } = store.getState().userReducer;
  switch (action.type) {
    case GET_EXERCISES:
      store.dispatch(setExercisesIsLoaded(false));
      const optionsExercises = {
        method: 'GET',
        url: `${backUrl}/api/exercises`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.request(optionsExercises)
        .then((response) => {
          // console.log((response.data))
          store.dispatch(setExercises(response.data));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          store.dispatch(setExercisesIsLoaded(true));
        });
      break;
    default:
      next(action);
  }
};

export default exercisesMiddleware;
