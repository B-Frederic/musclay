import { createStore, applyMiddleware, compose } from 'redux';

import userMiddleware from '../middleware/userMiddleware';
import trainingsListMiddleware from '../middleware/trainingsListMiddleware';
import userStatsMiddleware from '../middleware/userStatsMiddleware';
import setsMiddleware from '../middleware/setsMiddleware';
import exercisesMiddleware from '../middleware/exercisesMiddleware';
import contactUsMiddleware from '../middleware/contactUsMiddleware';
import reducer from '../reducers';
import emailVerificationMiddleware from '../middleware/emailVerificationMiddleware';
import planningMiddleware from '../middleware/planningMiddleware';
import resetPasswordMiddleware from '../middleware/resetPasswordMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(

  applyMiddleware(
    userMiddleware,
    trainingsListMiddleware,
    setsMiddleware,
    exercisesMiddleware,
    userStatsMiddleware,
    contactUsMiddleware,
    emailVerificationMiddleware,
    planningMiddleware,
    resetPasswordMiddleware,
  ),

);

const store = createStore(reducer, enhancers);

export default store;
