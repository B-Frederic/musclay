import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import { sendGoogleCallback } from '../../../actions/user';

function GoogleButton({ text }) {
  // text : signup_with = "S'inscrire avec Google"
  // text : signin_with = "Se connecter avec Google"
  // theme button : 'outline' => light theme | 'filled_black' => dark theme
  const { darkTheme } = useSelector((state) => state.userReducer);
  // console.log(darkTheme ? 'filled_black' : 'outline');
  const dispatch = useDispatch();
  useEffect(() => {
    // if (!window.google) return;
    function handleCredentialResponse(response) {
      dispatch(sendGoogleCallback(jwt_decode(response.credential)));
    }
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        theme: darkTheme ? 'filled_black' : 'outline',
        size: 'large',
        text: text,
        shape: 'pill',
      }, // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, [darkTheme]);

  return (
    <div id="signInDiv" />
  );
}

GoogleButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default GoogleButton;
