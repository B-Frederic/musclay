/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import {
  GET_PLANNING,
  setPlanning,
  setPlanningIsLoaded,
  getLinkPlanning,
  setLinkPlanning,
  GET_LINK_TRAINING_PLANNING,
  UPDATE_LINK_TRAINING_PLANNING,
  CREATE_LINK_TRAINING_PLANNING,
  createLinkTrainingPlanning,
  getPlanning,
} from '../actions/planning';

const backUrl = process.env.REACT_APP_BACK_URL;

const planningMiddleware = (store) => (next) => (action) => {
  const { token } = store.getState().userReducer;
  switch (action.type) {
    case GET_PLANNING:
      store.dispatch(setPlanningIsLoaded(false));
      const optionsPlanning = {
        method: 'GET',
        url: `${backUrl}/api/plannings`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.request(optionsPlanning)
        .then((response) => {
          store.dispatch(setPlanning(response.data));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          store.dispatch(getLinkPlanning());
        });
      break;
    case GET_LINK_TRAINING_PLANNING:
      const optionsLinkPlanning = {
        method: 'GET',
        url: `${backUrl}/api/reltrainingplannings`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.request(optionsLinkPlanning)
        .then((response) => {
          store.dispatch(setLinkPlanning(response.data));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          store.dispatch(setPlanningIsLoaded(true));
        });
      break;
    case UPDATE_LINK_TRAINING_PLANNING:
      store.dispatch(setPlanningIsLoaded(false));
      const optionsUpdateLinkPlanning = {
        method: 'DELETE',
        url: `${backUrl}/api/reltrainingplannings`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { relTrainingPlanning } = store.getState().planningReducer;
      if (relTrainingPlanning.length > 0) {
        axios.request(optionsUpdateLinkPlanning)
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            store.dispatch(createLinkTrainingPlanning(action.payload));
          });
      }
      else {
        store.dispatch(createLinkTrainingPlanning(action.payload));
      }
      break;
    case CREATE_LINK_TRAINING_PLANNING:
      const optionsCreateLinkPlanning = {
        method: 'POST',
        url: `${backUrl}/api/reltrainingplannings`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: action.payload,
      };
      if (action.payload.length > 0) {
        axios.request(optionsCreateLinkPlanning)
          .then(() => {
            store.dispatch(getPlanning());
          })
          .catch((error) => {
            console.error(error);
          });
      }
      else {
        store.dispatch(getPlanning());
      }
      break;
    default:
      next(action);
  }
};

export default planningMiddleware;
