import PropTypes from 'prop-types';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  TextField,
  Box,
  Typography,
  Rating,
  IconButton,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/PauseCircleOutline';
import RestartIcon from '@mui/icons-material/RestartAlt';
import { styled } from '@mui/material/styles';

export default function SetsTab({
  sets,
  index,
  selectedExercises,
  setSelectedExercises,
  exercisesSets,
  setExercisesSets,
  toggleAcordion,
  // Timer Props
  secondsToTime,
  sessionTime,
  playPause,
  workingChrono,
  resetFunc,
  setWorkingChrono,
  handleOpenClock,
}) {
  const tableHeaders = ['', 'Serie', 'Poids', 'Rep', 'Valider'];

  const handleValidate = () => {
    const newExercisesSets = [...exercisesSets];
    newExercisesSets[index].validate = true;
    setExercisesSets(newExercisesSets);
    toggleAcordion();
  };

  const handleDeleteExercise = () => {
    const newExercisesSets = [...exercisesSets];
    newExercisesSets.splice(index, 1);
    setExercisesSets(newExercisesSets);
    const newSelectedExercises = { ...selectedExercises };
    newSelectedExercises[exercisesSets[index].id].isSelected = false;
    setSelectedExercises(newSelectedExercises);
  };

  const updateExerciseComment = (comment) => {
    const newExercisesSets = [...exercisesSets];
    newExercisesSets[index].comment = comment;
    setExercisesSets(newExercisesSets);
  };

  const updateExerciseScore = (score) => {
    const newExercisesSets = [...exercisesSets];
    newExercisesSets[index].score = +score;
    setExercisesSets(newExercisesSets);
  };

  const handleAddSet = () => {
    const newExercisesSets = [...exercisesSets];
    const maxSetNumber = newExercisesSets[index].sets.reduce((max, set) => {
      // eslint-disable-next-line no-param-reassign
      max = set.set_number > max ? set.set_number : max;
      return max;
    }, 0);
    newExercisesSets[index].sets.push({
      set_number: maxSetNumber + 1,
      weight: newExercisesSets[index].sets[maxSetNumber - 1].weight,
      repetitions: newExercisesSets[index].sets[maxSetNumber - 1].repetitions,
      validate: false,
    });
    setExercisesSets(newExercisesSets);
  };

  const handleRemoveSet = (setNumber) => {
    const newExercisesSets = [...exercisesSets];
    if (newExercisesSets[index].sets.length > 1) {
      newExercisesSets[index].sets.splice(setNumber - 1, 1);
      let setNumberCount = 0;
      newExercisesSets[index].sets = newExercisesSets[index].sets.map((set) => {
        setNumberCount += 1;
        set.set_number = setNumberCount;
        return set;
      });
    }
    else {
      newExercisesSets.splice(index, 1);
      const newSelectedExercises = { ...selectedExercises };
      newSelectedExercises[exercisesSets[index].id].isSelected = false;
      setSelectedExercises(newSelectedExercises);
    }
    setExercisesSets(newExercisesSets);
  };

  const updateSetWeight = (weight, setNumber) => {
    const newExercisesSets = [...exercisesSets];
    newExercisesSets[index].sets.splice(
      setNumber - 1,
      1,
      { ...exercisesSets[index].sets[setNumber - 1], weight: +weight },
    );
    setExercisesSets(newExercisesSets);
  };

  const updateSetRepetitions = (repetitions, setNumber) => {
    const newExercisesSets = [...exercisesSets];
    newExercisesSets[index].sets.splice(
      setNumber - 1,
      1,
      { ...exercisesSets[index].sets[setNumber - 1], repetitions: +repetitions },
    );
    setExercisesSets(newExercisesSets);
  };

  const updateSetValidate = (setNumber) => {
    const newExercisesSets = [...exercisesSets];
    const validate = !newExercisesSets[index].sets[setNumber - 1].validate;
    if (validate) {
      resetFunc();
      setWorkingChrono(true);
    }
    else {
      setWorkingChrono(false);
      resetFunc();
    }
    newExercisesSets[index].sets.splice(
      setNumber - 1,
      1,
      { ...exercisesSets[index].sets[setNumber - 1], validate: validate },
    );
    setExercisesSets(newExercisesSets);
  };

  const StyledIconButton = styled(IconButton)`
&:hover {
  opacity: 0.7;
}
`;

  return (
    <TableContainer component={Paper} sx={{ width: 350, pb: 0.5 }}>
      <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 2,
      }}
      >
        <StyledIconButton onClick={handleOpenClock} style={{ backgroundColor: 'transparent' }}>
          <Paper>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                px: 1, borderRadius: '10px', mb: 0,
              }}
            >
              {secondsToTime(sessionTime)}
            </Typography>
          </Paper>
        </StyledIconButton>
        <IconButton onClick={playPause} color="primary">
          {workingChrono
            ? <PauseIcon sx={{ width: 30, height: 30 }} />
            : <PlayIcon sx={{ width: 30, height: 30 }} />}
        </IconButton>
        <IconButton onClick={resetFunc} color="primary">
          <RestartIcon sx={{ width: 30, height: 30 }} />
        </IconButton>
      </Box>
      <Table sx={{ minWidth: 'auto' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => <TableCell key={header} align="center">{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.map((set) => (
            <TableRow key={set.set_number}>
              <TableCell component="th" scope="row" align="center" style={{ width: '56px', padding: '5px' }}>
                <Fab onClick={() => handleRemoveSet(set.set_number)} size="small" color="warning" aria-label="remove">
                  <RemoveIcon />
                </Fab>
              </TableCell>
              <TableCell component="th" scope="row" align="center" style={{ width: '5%', padding: '0px' }}>{set.set_number}</TableCell>
              <TableCell align="center" style={{ width: '56px', padding: '5px' }}>
                <TextField
                  type="number"
                  value={set.weight}
                  onChange={(e) => updateSetWeight(e.currentTarget.value, set.set_number)}
                />
              </TableCell>
              <TableCell align="center" style={{ width: '56px', padding: '0px' }}>
                <TextField
                  type="number"
                  value={set.repetitions}
                  onChange={(e) => updateSetRepetitions(e.currentTarget.value, set.set_number)}
                />
              </TableCell>
              <TableCell align="center" style={{ width: '40px', padding: '5px' }}>
                <Checkbox onChange={
                    () => updateSetValidate(set.set_number)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="outlined" color="primary" sx={{ width: 300, my: 1 }} onClick={handleAddSet}><AddIcon />&nbsp;Ajouter une série</Button>
      <TextField
        id="comment"
        label="Commentaire"
        multiline
        maxRows={4}
        value={exercisesSets[index].comment}
        onChange={(e) => updateExerciseComment(e.currentTarget.value)}
        sx={{ width: 300 }}
      />
      <Box sx={{ display: 'flex', m: 1 }}>
        <Typography component="legend">Note :</Typography>
        <Rating
          id="score"
          name="score"
          precision={0.5}
          value={exercisesSets[index].score}
          onChange={(e) => updateExerciseScore(e.currentTarget.value)}
        />
      </Box>
      <Button variant="outlined" color="primary" sx={{ width: 330, mb: 0.5 }} onClick={handleValidate}>Valider</Button>
      <Button variant="outlined" color="error" sx={{ width: 330 }} onClick={handleDeleteExercise}>Supprimer</Button>
    </TableContainer>
  );
}

SetsTab.propTypes = {
  sets: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  index: PropTypes.number.isRequired,
  selectedExercises: PropTypes.object.isRequired,
  setSelectedExercises: PropTypes.func.isRequired,
  exercisesSets: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  setExercisesSets: PropTypes.func.isRequired,
  toggleAcordion: PropTypes.func.isRequired,
  // Timer props
  secondsToTime: PropTypes.func.isRequired,
  sessionTime: PropTypes.number.isRequired,
  playPause: PropTypes.func.isRequired,
  workingChrono: PropTypes.bool.isRequired,
  resetFunc: PropTypes.func.isRequired,
  setWorkingChrono: PropTypes.func.isRequired,
  handleOpenClock: PropTypes.func.isRequired,
};
