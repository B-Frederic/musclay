/* eslint-disable no-case-declarations */
import axios from 'axios';
import { SEND_CONTACT_FORM, setContactIsLoading, setContactResponseMessage } from '../actions/contactUs';
import { setAuthError } from '../actions/user';

const backUrl = process.env.REACT_APP_BACK_URL;

const contactUsMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SEND_CONTACT_FORM:
      const $contactUsData = action.payload;
      const optionContactUs = {
        method: 'POST',
        url: `${backUrl}/api/contact`,
        data: $contactUsData,
      };
      // axios.defaults.withCredentials = true;
      /*
      | Get the X-CSRF-COOKIE from laravel,
      | axios set the request header with csrf-cookie automatically
      */
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.request(optionContactUs)
          .then((res) => {
            store.dispatch(setContactResponseMessage(res.data.message));
          })
          .catch((error) => {
            const { data, status } = error.response;
            store.dispatch(setAuthError(status, data.message, true));
          }).finally(() => {
            store.dispatch(setContactIsLoading(false));
          });
      });
      break;
    default:
      next(action);
  }
};

export default contactUsMiddleware;
