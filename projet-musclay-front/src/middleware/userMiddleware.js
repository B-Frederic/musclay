/* eslint-disable no-case-declarations */
import axios from 'axios';
import {
  isUserProfilUpdated,
  SEND_GOOGLE_CALLBACK,
  setAuthError,
  setUser,
  setUserLogout,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REFRESH_TOKEN,
  USER_REGISTER,
  USER_UPDATE,
  setUserIsLoading,
  DELETE_USER_ACCOUNT,
  USER_UPDATE_PICTURE,
  DELETE_USER_PICTURE,
  setResponseMessage,
} from '../actions/user';
import { resetSets } from '../actions/sets';
import { resetTrainings } from '../actions/trainingsList';
import { resetStats } from '../actions/userStats';
import { resetLinkPlanning } from '../actions/planning';

const backUrl = process.env.REACT_APP_BACK_URL;

const userMiddleware = (store) => (next) => (action) => {
  const userTokenFromReducer = store.getState().userReducer.token;
  switch (action.type) {
    case USER_LOGIN:
      store.dispatch(setUserIsLoading(true));
      const userLoginPayload = action.payload;
      const optionsLogin = {
        method: 'POST',
        url: `${backUrl}/api/auth/login`,
        headers: { 'Content-Type': 'application/json' },
        data: userLoginPayload,
      };
      axios.request(optionsLogin)
        .then((response) => {
          console.log(response);
          const tokenLogin = response.data.access_token;
          localStorage.setItem('token', JSON.stringify(tokenLogin));
          store.dispatch(setUser(response.data.user, tokenLogin));
        })
        .catch((error) => {
          console.error(error);
          const { data, status } = error.response;
          const errorMsg = Object.keys(data)
            .map((key) => data[key]);
          store.dispatch(setAuthError(status, errorMsg, true));
        })
        .finally(() => {
          store.dispatch(setUserIsLoading(false));
        });
      break;

    case USER_REGISTER:
      const userRegister = action.payload;
      // console.log(user);
      const optionsRegister = {
        method: 'POST',
        url: `${backUrl}/api/auth/register`,
        headers: { 'Content-Type': 'application/json' },
        data: userRegister,
      };
      axios.request(optionsRegister)
        .then((response) => {
          // Afficher une message pour informer l'utilisateur qu'il faut vérifier son email.
          if (response.status === 201) {
            store.dispatch(setResponseMessage(response.data.message));
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          const { data, status } = error.response;
          // eslint-disable-next-line no-case-declarations
          const errorMsg = Object.keys(data)
            .map((key) => data[key]);
          store.dispatch(setAuthError(status, errorMsg, true));
        }).finally(() => {
          store.dispatch(setUserIsLoading(false));
        });
      break;

    case USER_UPDATE:
      const userUpdated = action.payload;
      // console.log(user);
      const optionsUpdate = {
        method: 'PATCH',
        url: `${backUrl}/api/auth/update`,
        headers: {
          Authorization: `Bearer ${userTokenFromReducer}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(userUpdated),
      };
      axios.request(optionsUpdate)
        .then((response) => {
          store.dispatch(setUser(response.data.user, userTokenFromReducer));
          store.dispatch(setResponseMessage(response.data.message));
          store.dispatch(isUserProfilUpdated(response.status === 200));
          // console.log(response);
        })
        .catch((error) => {
          const { data, status } = error.response;
          // // eslint-disable-next-line no-case-declarations
          // const errorMsg = Object.keys(data)
          //   .map((key) => data[key]);
          store.dispatch(setAuthError(status, data.message, true));
          store.dispatch(isUserProfilUpdated(error.status === 200));
        });
      break;

    case USER_UPDATE_PICTURE:
      const userUpdatedPictureUrl = action.payload;
      // console.log(user);
      const optionsUpdatePictureUrl = {
        method: 'PATCH',
        url: `${backUrl}/api/auth/update-picture`,
        headers: {
          Authorization: `Bearer ${userTokenFromReducer}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ picture: userUpdatedPictureUrl }),
      };
      axios.request(optionsUpdatePictureUrl)
        .then((response) => {
          console.log(response);
          store.dispatch(setUser(response.data.user, userTokenFromReducer));
          store.dispatch(setResponseMessage(response.data.message));
          store.dispatch(isUserProfilUpdated(response.status === 200));
        })
        .catch((error) => {
          console.log(error);
          console.log(error)
          const { data, status } = error.response;
          // eslint-disable-next-line no-case-declarations
          const errorMsg = Object.keys(data)
            .map((key) => data[key]);
          store.dispatch(setAuthError(status, errorMsg, true));
          store.dispatch(isUserProfilUpdated(error.status === 200));
        });
      break;

    case DELETE_USER_PICTURE:
      const optionsDeletePicture = {
        method: 'PATCH',
        url: `${backUrl}/api/auth/delete-picture`,
        headers: {
          Authorization: `Bearer ${userTokenFromReducer}`,
          'Content-Type': 'application/json',
        },
      };
      axios.request(optionsDeletePicture)
        .then((response) => {
          store.dispatch(setUser(response.data.user, userTokenFromReducer));
          store.dispatch(setResponseMessage(response.data.message));
          store.dispatch(isUserProfilUpdated(response.status === 200));
        })
        .catch((error) => {
          console.log(error);
          const { data, status } = error.response;
          // eslint-disable-next-line no-case-declarations
          const errorMsg = Object.keys(data).map((key) => data[key]);
          store.dispatch(setAuthError(status, errorMsg, true));
          store.dispatch(isUserProfilUpdated(error.status === 200));
        });
      break;

    case USER_LOGOUT:
      // Reset data on user logout
      store.dispatch(resetTrainings());
      store.dispatch(resetSets());
      store.dispatch(resetStats());
      store.dispatch(resetLinkPlanning());
      const tokenLogout = store.getState().userReducer.token;
      const optionsLogout = {
        method: 'POST',
       url: `${backUrl}/api/auth/logout`,
        // Header pour le JWT
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userTokenFromReducer}`,
        },
      };
      axios.request(optionsLogout)
        .then((response) => {
          // If user is google user , execute logout function :
          if (store.getState().userReducer.isGooglerUser) {
            google.accounts.id.disableAutoSelect();
          }
          store.dispatch(setUserLogout());
          localStorage.removeItem('token');
          // console.log(response);
        })
        .catch((error) => {
          console.error(error);
          // disconnect on local state even if there is an axios error
          store.dispatch(setUserLogout());
          localStorage.removeItem('token');
        });
      break;

    case DELETE_USER_ACCOUNT:
      const optionsDeleteAccount = {
        method: 'DELETE',
        url: `${backUrl}/api/auth/delete`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userTokenFromReducer}`,
        },
      };
      axios.request(optionsDeleteAccount)
        .then((response) => {
          // console.log(response);
          if (store.getState().userReducer.isGooglerUser) {
            google.accounts.id.disableAutoSelect();
          }
          store.dispatch(setUserLogout());
          localStorage.removeItem('token');
          // Redirect to connexion
          window.location.href = '/';
        })
        .catch((error) => {
          console.error(error);
        });
      break;

    // GOOGLE CONNEXION CALLBACK :
    case SEND_GOOGLE_CALLBACK:
      const googleCredential = action.payload;
      const optionsGoogle = {
        method: 'POST',
        url: `${backUrl}/api/auth/google`,
        headers: {
          'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
        },
        data: googleCredential,
      };
      axios.request(optionsGoogle)
        .then((response) => {
          // Token created from server
          const tokenLogin = response.data.access_token;
          localStorage.setItem('token', JSON.stringify(tokenLogin));
          // Create new user with information from server (name, email, token)
          store.dispatch(setUser(response.data.user, tokenLogin));
          // To differenciate regular user from google user
          // ( because google user has no password -- random password generate on server side--)
          // store.dispatch(setIsGoogleUser(true));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case USER_REFRESH_TOKEN:
      const localStorageToken = JSON.parse(localStorage.getItem('token'));
      const optionsRefreshToken = {
        method: 'POST',
        url: `${backUrl}/api/auth/refresh`,
        // Header pour le JWT
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      };
      axios.request(optionsRefreshToken)
        .then((response) => {
          const token = response.data.access_token;
          localStorage.removeItem('token');
          localStorage.setItem('token', JSON.stringify(token));
          store.dispatch(setUser(response.data.user, token));
          // console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
      break;

    default:
      next(action);
  }
};

export default userMiddleware;
