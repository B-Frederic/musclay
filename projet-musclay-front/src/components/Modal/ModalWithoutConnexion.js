import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useDispatch } from 'react-redux';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { setUserWithoutAccount } from '../../actions/user';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '300px', sm: '45%' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ModalWithoutConnexion({ open, setOpen }) {
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);

  const handleContinueWithoutAccount = () => {
    dispatch(setUserWithoutAccount(true));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <WarningAmberIcon sx={{
              fontSize: 70, marginTop: '-10px', marginBottom: '10px', color: 'red',
            }}
            />
            <HighlightOffRoundedIcon
              cursor="pointer"
              onClick={handleClose}
              sx={{
                width: '35px', height: '35px', position: 'absolute', top: { lg: '15px', xs: '10px' }, right: { lg: '15px', xs: '10px' },
              }}
            />
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong style={{ fontSize: '30px' }}>ATTENTION</strong> <br /> Si vous continuez sans être connecté,
            vos entrainements ne seront <strong>pas enregistrés.</strong>
          </Typography>
          <Stack direction="column" spacing={1}>
            <Button onClick={handleClose} variant="contained" component={Link} to="/" style={{ width: '150px', marginTop: '10px', marginBottom: '5px' }}>Se connecter</Button>
            <Button onClick={handleClose} variant="contained" component={Link} to="/inscription" style={{ width: '150px' }}>S'enregistrer</Button>
          </Stack>
          <Typography id="modal-modal-title" variant="h6" component="h2">ou</Typography>
          <Button onClick={handleContinueWithoutAccount} variant="contained" component={Link} to="/accueil" color="success" style={{ width: '150px', marginBottom: '10px' }}>Continuer</Button>
        </Box>
      </Modal>
    </div>
  );
}

ModalWithoutConnexion.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default ModalWithoutConnexion;
