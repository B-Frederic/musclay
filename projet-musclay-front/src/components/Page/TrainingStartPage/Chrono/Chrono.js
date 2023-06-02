import {
  TextField, Typography, IconButton, Modal, Box, Paper,
} from '@mui/material';
import PropTypes from 'prop-types';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/PauseCircleOutline';
import RestartIcon from '@mui/icons-material/RestartAlt';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '250px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

function Chrono({
  openClock,
  handleCloseClock,
  sessionTime,
  setSessionTime,
  workingChrono,
  sessionTimeFixed,
  setSessionTimeFixed,
  timeToSeconds,
  secondsToTime,
  playPause,
  resetFunc,
}) {
  const handleTimerInput = (timer) => {
    setSessionTimeFixed(timer);
    setSessionTime(timeToSeconds(timer));
  };

  return (

    <Modal
      open={openClock}
      onClose={handleCloseClock}
    >
      <Box sx={style}>
        <TextField
          id="time"
          label="Minuteur"
          type="time"
          value={sessionTimeFixed}
          onChange={(e) => handleTimerInput(e.currentTarget.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          sx={{ width: 150 }}
        />
        <Paper sx={{ my: 2 }}>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={{
              px: 1, borderRadius: '10px', mb: 0,
            }}
          >
            {secondsToTime(sessionTime)}
          </Typography>
        </Paper>
        <Box sx={{ display: 'flex' }}>
          <IconButton onClick={playPause} color="primary">
            {workingChrono
              ? <PauseIcon sx={{ width: 60, height: 60 }} />
              : <PlayIcon sx={{ width: 60, height: 60 }} />}
          </IconButton>
          <IconButton onClick={resetFunc} color="primary">
            <RestartIcon sx={{ width: 60, height: 60 }} />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}
Chrono.propTypes = {
  openClock: PropTypes.bool.isRequired,
  handleCloseClock: PropTypes.func.isRequired,
  sessionTime: PropTypes.number.isRequired,
  setSessionTime: PropTypes.func.isRequired,
  workingChrono: PropTypes.bool.isRequired,
  sessionTimeFixed: PropTypes.string.isRequired,
  setSessionTimeFixed: PropTypes.func.isRequired,
  timeToSeconds: PropTypes.func.isRequired,
  secondsToTime: PropTypes.func.isRequired,
  playPause: PropTypes.func.isRequired,
  resetFunc: PropTypes.func.isRequired,
};

export default Chrono;
