export const SEND_RESET_PASSWORD = 'SEND_RESET_PASSWORD';
export const sendResetPassword = (email) => ({
  type: SEND_RESET_PASSWORD,
  payload: email,
});

export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';
export const setNewPassword = (inputs) => ({
  type: SET_NEW_PASSWORD,
  payload: inputs,
});
