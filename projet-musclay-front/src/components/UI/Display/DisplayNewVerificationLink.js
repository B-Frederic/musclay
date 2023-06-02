import Proptypes from 'prop-types';
import { Box, Button, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { blueGrey } from '@mui/material/colors';
import { blueDark } from '../../../theme/theme2';

function DisplayNewVerificationLink({ onClick }) {
  const { isLoading, darkTheme } = useSelector((state) => state.userReducer);
  return (
    <Box sx={{ mb: 2, position: 'relative' }}>
      <Button disabled={isLoading} sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={onClick}>
        Renvoyer un email de vérification ?
      </Button>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            color: darkTheme ? blueGrey[100] : blueDark[500],
            position: 'absolute',
            top: '50%',
            left: '105%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
}

DisplayNewVerificationLink.propTypes = {
  onClick: Proptypes.func.isRequired,
};

export default DisplayNewVerificationLink;
