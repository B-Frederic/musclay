import Proptypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { isUserProfilUpdated, setAuthError, setResponseMessage } from '../../../actions/user';
import { setContactResponseMessage } from '../../../actions/contactUs';

function DisplayMsg({
  message, type, vertical, horizontal,
}) {
  const dispatch = useDispatch();
  const [openSnack, setOpenSnack] = useState(true);
  const positionSnack = { vertical: vertical, horizontal: horizontal };
  const handleClose = () => {
    setOpenSnack(false);
    dispatch(setAuthError(false, false, false));
    dispatch(setResponseMessage(''));
    dispatch(setContactResponseMessage(''));
    dispatch(isUserProfilUpdated(false));
    setOpenSnack(true);
  };

  return (
    <Snackbar
      sx={{ position: 'absolute' }}
      key={message}
      open={openSnack}
      anchorOrigin={positionSnack}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity={type} onClose={handleClose} sx={{ mb: 2, justifyContent: 'center' }} key={message}>{message}</Alert>
    </Snackbar>
  );
}

DisplayMsg.propTypes = {
  message: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  horizontal: Proptypes.string.isRequired,
  vertical: Proptypes.string.isRequired,
};

export default DisplayMsg;
