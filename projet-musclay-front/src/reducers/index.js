import { combineReducers } from 'redux';
import userReducer from './userReducer';
import trainingsListReducer from './trainingsListReducer';

import userStatsReducer from './userStatsReducer';

import setsReducer from './setsReducer';
import contactUsReducer from './contactUsReducer';
import exercisesReducer from './exercisesReducer';
import planningReducer from './planningReducer';

const allReducers = combineReducers({
  userReducer,
  trainingsListReducer,
  setsReducer,
  exercisesReducer,
  userStatsReducer,
  contactUsReducer,
  planningReducer,
});
export default allReducers;
