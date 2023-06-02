export const RE_SEND_LINK_MAIL_VERIFICATION = 'RE_SEND_LINK_MAIL_VERIFICATION';
export const reSendLinkMailVerifiction = (userData) => ({
  type: RE_SEND_LINK_MAIL_VERIFICATION,
  payload: userData,
});
