import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useDispatch, useSelector } from 'react-redux';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { deleteTraining, setTrainings } from '../../actions/trainingsList';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '300px', sm: '35%' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ModalDeleteTraining({ open, setOpen, id }) {
  const trainingsState = useSelector((state) => state.trainingsListReducer);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);

  const handleDeleteTraining = () => {
    if (!userState.userWithoutAccount) dispatch(deleteTraining(id));
    // user without account
    if (userState.userWithoutAccount) {
      const newTrainings = [...trainingsState.trainings];
      const indexToDelete = newTrainings.findIndex((training) => training.id === id);
      newTrainings.splice(indexToDelete, 1);
      dispatch(setTrainings(newTrainings));
      localStorage.setItem('trainings', JSON.stringify(newTrainings));
    }
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
            <strong style={{ fontSize: '25px' }}>ATTENTION</strong> <br /> Vous êtes sur le point de <strong>supprimer</strong> votre entrainement.
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button onClick={handleDeleteTraining} variant="contained" style={{ width: '50px', marginTop: '20px', backgroundColor: 'red' }}>Oui</Button>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: '20px' }}>ou</Typography>
            <Button onClick={handleClose} variant="contained" style={{ width: '50px', marginTop: '20px', backgroundColor: 'green' }}>Non</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

ModalDeleteTraining.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default ModalDeleteTraining;
