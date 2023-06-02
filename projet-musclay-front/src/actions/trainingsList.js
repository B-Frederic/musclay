// Middleware Actions
export const GET_TRAININGS = 'GET_TRAININGS';
export const getTrainings = () => ({
  type: GET_TRAININGS,
});

// Reducer Action
export const SET_TRAININGS = 'SET_TRAININGS';
export const setTrainings = (trainings) => ({
  type: SET_TRAININGS,
  payload: trainings,
});

// Reducer Action
export const RESET_TRAININGS = 'RESET_TRAININGS';
export const resetTrainings = () => ({
  type: RESET_TRAININGS,
});

export const SET_TRAININGS_IS_LOADED = 'SET_TRAININGS_IS_LOADED';
export const setTrainingsIsLoaded = (bool) => ({
  type: SET_TRAININGS_IS_LOADED,
  payload: bool,
});

// Middleware Actions
export const DELETE_TRAINING = 'DELETE_TRAINING';
export const deleteTraining = (id) => ({
  type: DELETE_TRAINING,
  payload: id,
});

// Middleware Actions
export const GET_TAGS = 'GET_TAGS';
export const getTags = () => ({
  type: GET_TAGS,
});

// Reducer Action
export const SET_TAGS = 'SET_TAGS';
export const setTags = (tags) => ({
  type: SET_TAGS,
  payload: tags,
});

// Middleware Actions
export const CREATE_TRAINING = 'CREATE_TRAINING';
export const createTraining = (trainingName, tags) => ({
  type: CREATE_TRAINING,
  payload: {
    trainingToCreate: { name: trainingName },
    tags: tags,
  },
});

// Middleware Actions
export const CREATE_LINK_TRAINING_TAGS = 'CREATE_LINK_TRAINING_TAGS';
export const createLinkTrainingTags = (relTrainingTags) => ({
  type: CREATE_LINK_TRAINING_TAGS,
  payload: relTrainingTags,
});

// Middleware Actions
export const DELETE_LINK_TRAINING_TAGS = 'DELETE_LINK_TRAINING_TAGS';
export const deleteLinkTrainingTags = (trainingId, relTrainingTags, editTags, deleteTags) => ({
  type: DELETE_LINK_TRAINING_TAGS,
  payload: {
    id: trainingId,
    relTrainingTags: relTrainingTags,
    editTags: editTags,
    deleteTags: deleteTags,
  },
});

// Middleware Actions
export const UPDATE_TRAINING = 'UPDATE_TRAINING';
export const updateTraining = (trainingId, trainingName, tags, editTags, deleteTags) => ({
  type: UPDATE_TRAINING,
  payload: {
    id: trainingId,
    trainingToUpdate: {
      name: trainingName,
    },
    tags: tags,
    editTags: editTags,
    deleteTags: deleteTags,
  },
});

// Reducer Action
export const SET_CREATED_TRAININGS = 'SET_CREATED_TRAININGS';
export const setCreatedTraining = (training) => ({
  type: SET_CREATED_TRAININGS,
  payload: training,
});
