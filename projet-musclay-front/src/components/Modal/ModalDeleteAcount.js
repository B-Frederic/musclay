import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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

function ModalDeleteAcount({ open, setOpen, onSubmit }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={onSubmit}>
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
            <strong style={{ fontSize: '25px' }}>ATTENTION</strong> <br /> Voulez vous <strong>supprimer</strong> votre compte
            et retrouver votre corps de lâche <strong>(c'est irréversible)</strong> ?
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" style={{ width: '50px', marginTop: '20px', backgroundColor: 'red' }}>Oui</Button>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginTop: '20px' }}>ou</Typography>
            <Button variant="contained" onClick={handleClose} style={{ width: '50px', marginTop: '20px', backgroundColor: 'green' }}>Non</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

ModalDeleteAcount.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ModalDeleteAcount;
