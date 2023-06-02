import { SET_CONTACT_IS_LOADING, SET_CONTACT_RESPONSE_MESSAGE } from '../actions/contactUs';

const initialState = {
  message: false,
  isPosted: false,
  isLoading: false,
};

// eslint-disable-next-line default-param-last
const contactUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACT_RESPONSE_MESSAGE:
      // eslint-disable-next-line no-case-declarations
      const { message, isPosted } = action.payload;
      return {
        ...state,
        message: message,
        isPosted: isPosted,
      };
    case SET_CONTACT_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default contactUsReducer;
