import {
  IS_USER_PROFIL_UPDATED,
  SET_AUTH_ERROR,
  SET_IS_GOOGLE_USER,
  SET_USER,
  SET_USER_LOGOUT,
  SET_USER_IS_LOADING,
  SET_USER_WITHOUT_ACCOUNT,
  SET_USER_THEME,
  SET_RESPONSE_MESSAGE,
} from '../actions/user';

const localTheme = localStorage.getItem('darkTheme') === 'true' ? true : false;
const localUserWithoutAccount = localStorage.getItem('userWithoutAccount') === 'true' ? true : false;

const initialState = {
  isLogged: false,
  token: '',
  user: '',
  isGoogleUser: false,
  error: {
    errorMsg: '',
    status: '',
    isError: false,
  },
  isProfilEdited: false,
  isLoading: false,
  userWithoutAccount: localUserWithoutAccount,
  darkTheme: localTheme,
  responseMessage: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      // reset data of user without account
      localStorage.removeItem('userWithoutAccount');
      localStorage.removeItem('trainings');
      localStorage.removeItem('sets');
      const isGooglerUser = action.payload.user.google_id !== null;
      const { user } = action.payload;
      const { token } = action.payload;
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLogged: true,
        isGoogleUser: isGooglerUser,
        error: {
          errorMsg: '',
          status: '',
          isError: false,
        },
        userWithoutAccount: false,
      };
    case SET_USER_LOGOUT:
      // reset data on logout
      return {
        ...initialState,
      };
    case SET_RESPONSE_MESSAGE:
      const responseMessage = action.payload;
      return {
        ...state,
        responseMessage: responseMessage,
      };

    case SET_IS_GOOGLE_USER:
      const isGoogleUser = action.payload;
      return {
        ...state,
        isGoogleUser: isGoogleUser,
      };

    case SET_USER_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,

      };
    case IS_USER_PROFIL_UPDATED:
      return {
        ...state,
        isProfilEdited: action.payload,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_USER_WITHOUT_ACCOUNT:
      localStorage.setItem('userWithoutAccount', action.payload);
      return {
        ...state,
        userWithoutAccount: action.payload,
      };
    case SET_USER_THEME:
      localStorage.setItem('darkTheme', action.payload);
      return {
        ...state,
        darkTheme: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
