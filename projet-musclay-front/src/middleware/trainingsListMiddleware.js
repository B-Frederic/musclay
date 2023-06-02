/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import {
  GET_TRAININGS,
  setTrainingsIsLoaded,
  setTrainings,
  getTrainings,
  DELETE_TRAINING,
  GET_TAGS,
  setTags,
  CREATE_TRAINING,
  UPDATE_TRAINING,
  CREATE_LINK_TRAINING_TAGS,
  DELETE_LINK_TRAINING_TAGS,
  createLinkTrainingTags,
  deleteLinkTrainingTags,
  setCreatedTraining,
} from '../actions/trainingsList';
import { setPlanningIsLoaded } from '../actions/planning';

const backUrl = process.env.REACT_APP_BACK_URL;

const trainingsListMiddleware = (store) => (next) => (action) => {
  const { token } = store.getState().userReducer;
  switch (action.type) {
    case GET_TRAININGS:
      store.dispatch(setTrainingsIsLoaded(false));
      store.dispatch(setPlanningIsLoaded(false));
      const optionsTrainings = {
        method: 'GET',
        url: `${backUrl}/api/trainings`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.request(optionsTrainings)
        .then((response) => {
          // console.log((response.data))
          store.dispatch(setTrainings(response.data));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          store.dispatch(setTrainingsIsLoaded(true));
        });
      break;
    case DELETE_TRAINING:
      const trainingId = action.payload;
      const optionsTrainingDelete = {
        method: 'DELETE',
        url: `${backUrl}/api/training/${trainingId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.request(optionsTrainingDelete)
        // .then(() => {
        //   store.dispatch(setIsLoading(true));
        // })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          store.dispatch(getTrainings());
        });
      break;
    case GET_TAGS:
      const optionsTags = {
        method: 'GET',
        url: `${backUrl}/api/tags`,
      };
      axios.request(optionsTags)
        .then((response) => {
          // console.log((response.data))
          store.dispatch(setTags(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
      // .finally(() => {
      //   store.dispatch(setIsLoading(false));
      // });
      break;
    case CREATE_TRAINING:
      const optionsCreateTraining = {
        method: 'POST',
        url: `${backUrl}/api/training`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: action.payload.trainingToCreate,
      };
      axios.request(optionsCreateTraining)
        .then((response) => {
          // Create json for link table between training and tags
          const relTrainingTags = action.payload.tags.map((tag) => ({
            training_id: response.data.id,
            tag_id: tag.id,
          }));
          store.dispatch(createLinkTrainingTags(relTrainingTags));
          store.dispatch(setCreatedTraining(response.data));
        }).catch((error) => {
          console.error(error);
        });

      break;
    case CREATE_LINK_TRAINING_TAGS:
      const optionsCreateLinkTrainingTags = {
        method: 'POST',
        url: `${backUrl}/api/reltrainingtags`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: action.payload,
      };
      if (action.payload.length > 0) {
        axios.request(optionsCreateLinkTrainingTags)
          // .then((response) => {
          //   store.dispatch(setIsLoading(true));
          // })
          .catch((error) => {
            console.error(error);
          }).finally(() => {
            store.dispatch(getTrainings());
          });
      }
      else {
        store.dispatch(getTrainings());
      }
      break;
    case UPDATE_TRAINING:
      const optionsUpdateTraining = {
        method: 'PATCH',
        url: `${backUrl}/api/training/${action.payload.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: action.payload.trainingToUpdate,
      };
      axios.request(optionsUpdateTraining)
        .then((response) => {
          const trainingUpdated = response.data;
          // Create json for link table between training and tags
          const relTrainingTags = action.payload.tags.map((tag) => ({
            training_id: trainingUpdated.id,
            tag_id: tag.id,
          }));
          store.dispatch(
            deleteLinkTrainingTags(
              action.payload.id,
              relTrainingTags,
              action.payload.editTags,
              action.payload.deleteTags,
            ),
          );
        }).catch((error) => {
          console.error(error);
        });
      break;
    case DELETE_LINK_TRAINING_TAGS:
      const optionsDeleteLinkTrainingTags = {
        method: 'DELETE',

        url: `${backUrl}/api/reltrainingtags/${action.payload.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: action.payload,
      };
      if (action.payload.editTags) {
        if (action.payload.deleteTags) {
          axios.request(optionsDeleteLinkTrainingTags)
            .then(() => {
              store.dispatch(createLinkTrainingTags(action.payload.relTrainingTags));
            })
            .catch((error) => {
              console.error(error);
            });
        }
        else {
          store.dispatch(createLinkTrainingTags(action.payload.relTrainingTags));
        }
      }
      else {
        store.dispatch(getTrainings());
      }
      break;
    default:
      next(action);
  }
};

export default trainingsListMiddleware;
