/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import { RE_SEND_LINK_MAIL_VERIFICATION } from '../actions/emailVerification';
import { setAuthError, setResponseMessage, setUserIsLoading } from '../actions/user';

const backUrl = process.env.REACT_APP_BACK_URL;

const emailVerificationMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case RE_SEND_LINK_MAIL_VERIFICATION:
      const userData = action.payload;
      const optionReSendLink = {
        method: 'POST',
        url: `${backUrl}/api/email/verify/reSendVerificationLink`,
        data: userData,
      };
      axios.request(optionReSendLink)
        .then((response) => {
          console.log(response);
            store.dispatch(setResponseMessage(response.data.message));
        })
        .catch((error) => {
          console.error(error);
          const { data, status } = error.response;
          const errorMsg = Object.keys(data)
            .map((key) => data[key]);
          store.dispatch(setAuthError(status, errorMsg, true));
        }).finally(() => {
          store.dispatch(setUserIsLoading(false));
        });
      break;
    default:
      next(action);
  }
};

export default emailVerificationMiddleware;
