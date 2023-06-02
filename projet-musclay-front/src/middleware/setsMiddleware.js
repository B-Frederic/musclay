/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import {
  GET_SETS,
  setSets,
  setSetsIsLoaded,
  getSets,
  UPDATE_SETS,
  CREATE_SETS,
  createSets,
} from '../actions/sets';

const backUrl = process.env.REACT_APP_BACK_URL;

const setsMiddleware = (store) => (next) => (action) => {
  const { token } = store.getState().userReducer;
  switch (action.type) {
    case GET_SETS:
      store.dispatch(setSetsIsLoaded(false));
      const optionsSets = {
        method: 'GET',

        url: `${backUrl}/api/training/sets`,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.request(optionsSets)
        .then((response) => {
          // console.log((response.data));
          store.dispatch(setSets(response.data));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          store.dispatch(setSetsIsLoaded(true));
        });
      break;
    case UPDATE_SETS:
      const optionsDeleteSets = {
        method: 'DELETE',
        url: `${backUrl}/api/training/${action.payload.id}/sets`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log(action.payload.deleteSets);
      if (action.payload.deleteSets) {
        axios.request(optionsDeleteSets)
          .then(() => {
            store.dispatch(createSets(action.payload.id, action.payload.sets));
          })
          .catch((error) => {
            console.error(error);
          });
      }
      else {
        store.dispatch(createSets(action.payload.id, action.payload.sets));
      }
      break;
    case CREATE_SETS:
      const optionsCreateSets = {
        method: 'POST',
        url: `${backUrl}/api/sets`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: action.payload.sets,
      };
      if (action.payload.sets.length > 0) {
        axios.request(optionsCreateSets)
          .then(() => {
            store.dispatch(getSets(action.payload.id));
            // store.dispatch(setSets(response.data));
          })
          .catch((error) => {
            console.error(error);
          });
      }
      else {
        store.dispatch(getSets(action.payload.id));
      }
      break;
    default:
      next(action);
  }
};

export default setsMiddleware;
