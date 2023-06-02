export const SEND_CONTACT_FORM = 'SEND_CONTACT_FORM';
export const sendContactForm = (contactUsData) => ({
  type: SEND_CONTACT_FORM,
  payload: contactUsData,
});

export const SET_CONTACT_RESPONSE_MESSAGE = 'SET_CONTACT_RESPONSE_MESSAGE';
export const setContactResponseMessage = (message, isPosted = false) => ({
  type: SET_CONTACT_RESPONSE_MESSAGE,
  payload: {
    message,
    isPosted,
  },
});

export const SET_CONTACT_IS_LOADING = 'SET_CONTACT_IS_LOADING';
export const setContactIsLoading = (bool) => ({
  type: SET_CONTACT_IS_LOADING,
  payload: bool,
});
