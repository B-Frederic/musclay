import Proptypes from 'prop-types';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthError, setResponseMessage } from '../../../actions/user';

function DisplayError({ errorsArray, type, vertical, horizontal }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.userReducer.error);
  const [openSnack, setOpenSnack] = useState(true);
  const positionSnack = { vertical: vertical, horizontal: horizontal };
  const handleClose = () => {
    setOpenSnack(false);
    dispatch(setAuthError(status, false, false));
    dispatch(setResponseMessage(''));
    setOpenSnack(true);
  };

  return (
    <>
      {errorsArray.map((errorMsg) => (
        <Snackbar
          key={errorMsg}
          open={openSnack}
          anchorOrigin={positionSnack}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert severity={type} onClose={handleClose} sx={{ mb: 2, justifyContent: 'center' }} key={errorMsg}>
            {errorMsg}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}

DisplayError.propTypes = {
  errorsArray: Proptypes.array.isRequired,
  type: Proptypes.string.isRequired,
  horizontal: Proptypes.string.isRequired,
  vertical: Proptypes.string.isRequired,
};

export default DisplayError;
