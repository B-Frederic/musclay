/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import { SEND_RESET_PASSWORD, SET_NEW_PASSWORD } from '../actions/resetPassword';
import { setAuthError, setResponseMessage, setUserIsLoading } from '../actions/user';

const backUrl = process.env.REACT_APP_BACK_URL;

axios.defaults.withCredentials = true;

const resetPasswordMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SEND_RESET_PASSWORD:
      const userEmail = action.payload;
      console.log(userEmail);
      const optionsResetPassword = {
        method: 'POST',
        url: `${backUrl}/api/forgot-password`,
        data: userEmail,
      };
      axios.get('/sanctum/csrf-cookie').then((response) => {
        axios.request(optionsResetPassword)
          .then((response) => {
            console.log((response));
            store.dispatch(setResponseMessage(response.data.message));
          })
          .catch((error) => {
            console.log(error);
            const errorMsg = error.response.data.message;
            const { status } = error.response;
            store.dispatch(setAuthError(status, errorMsg, true));
          }).finally(() => {
            store.dispatch(setUserIsLoading(false));
          });
      });
      break;

    case SET_NEW_PASSWORD:
      const inputsValues = action.payload;
      const optionsSetNewPassword = {
        method: 'POST',
        url: `${backUrl}/api/reset-password`,
        data: inputsValues,
      };
      axios.get('/sanctum/csrf-cookie').then((response) => {
        axios.request(optionsSetNewPassword)
          .then((response) => {
            console.log((response));
            store.dispatch(setResponseMessage(response.data.message));
          })
          .catch((error) => {
            console.error(error);
            const errorMsg = error.response.data.message;
            const { status } = error.response;
            store.dispatch(setAuthError(status, errorMsg, true));
          });
      });
      break;
    default:
      next(action);
  }
};

export default resetPasswordMiddleware;
