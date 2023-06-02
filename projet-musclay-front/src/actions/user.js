// userMiddleware action
export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const USER_LOGOUT = 'LOGOUT';
export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const USER_REGISTER = 'USER_REGISTER';
export const userRegister = (user) => ({
  type: USER_REGISTER,
  payload: user,
});

export const SET_RESPONSE_MESSAGE = 'SET_RESPONSE_MESSAGE';
export const setResponseMessage = (message) => ({
  type: SET_RESPONSE_MESSAGE,
  payload: message,
});

//* EDIT PAGE ACTIONS:

export const USER_UPDATE = 'USER_UPDATE';
export const userUpdate = (user) => ({
  type: USER_UPDATE,
  payload: user,
});

export const USER_UPDATE_PICTURE = 'USER_UPDATE_PICTURE';
export const userUpdatePicture = (url) => ({
  type: USER_UPDATE_PICTURE,
  payload: url,
});

export const DELETE_USER_ACCOUNT = 'DELETE_USER_ACCOUNT';
export const deleteUserAccount = () => ({
  type: DELETE_USER_ACCOUNT,
});

export const DELETE_USER_PICTURE = 'DELETE_USER_PICTURE';
export const deleteUserPicture = () => ({
  type: DELETE_USER_PICTURE,
});

export const SET_USER_IS_LOADING = 'SET_USER_IS_LOADING';
export const setUserIsLoading = (bool) => ({
  type: SET_USER_IS_LOADING,
  payload: bool,
});

//* GLOBAL USER ACTIONS :

export const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN';
export const userRefreshToken = () => ({
  type: USER_REFRESH_TOKEN,
});


export const SET_IS_GOOGLE_USER = 'SET_IS_GOOGLE_USER';
export const setIsGoogleUser = (bool) => ({
  type: SET_IS_GOOGLE_USER,
  payload: bool,
});

export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const setAuthError = (errorCode, errorMsg, bool) => ({
  type: SET_AUTH_ERROR,
  payload: {
    status: errorCode,
    errorMsg: errorMsg,
    isError: bool,
  },
});

// Reducer action
export const SET_USER = 'SET_USER';
export const setUser = (user, token) => ({
  type: SET_USER,
  payload: {
    user,
    token,
  },
});

export const SEND_GOOGLE_CALLBACK = 'SEND_GOOGLE_CALLBACK';
export const sendGoogleCallback = (responseCallback) => ({
  type: SEND_GOOGLE_CALLBACK,
  payload: responseCallback,
});

export const SET_USER_LOGOUT = 'SET_USER_LOGOUT';
export const setUserLogout = () => ({
  type: SET_USER_LOGOUT,
});

export const IS_USER_PROFIL_UPDATED = 'IS_USER_PROFIL_UPDATED';
export const isUserProfilUpdated = (bool) => ({
  type: IS_USER_PROFIL_UPDATED,
  payload: bool,
});

export const SET_USER_WITHOUT_ACCOUNT = 'SET_USER_WITHOUT_ACCOUNT';
export const setUserWithoutAccount = (bool) => ({
  type: SET_USER_WITHOUT_ACCOUNT,
  payload: bool,
});

export const SET_USER_THEME = 'SET_USER_THEME';
export const setUserTheme = (bool) => ({
  type: SET_USER_THEME,
  payload: bool,
});
