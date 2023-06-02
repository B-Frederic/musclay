import PropTypes from 'prop-types';
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fab, TextField,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function SetsTab({
  sets,
  index,
  selectedExercises, setSelectedExercises, exercisesSets, setExercisesSets, toggleAcordion,
}) {
  const tableHeaders = ['', 'Serie', 'Poids', 'Rep'];

  const handleDeleteExercise = () => {
    const newExercisesSets = [...exercisesSets];
    newExercisesSets.splice(index, 1);
    setExercisesSets(newExercisesSets);
    const newSelectedExercises = { ...selectedExercises };
    newSelectedExercises[exercisesSets[index].id].isSelected = false;
    setSelectedExercises(newSelectedExercises);
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

  return (
    <TableContainer component={Paper} sx={{ width: 350, pb: 0.5 }}>
      <Table sx={{ minWidth: 'auto' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => <TableCell key={header} align="center">{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {sets.map((set) => (
            <TableRow key={set.set_number}>
              <TableCell component="th" scope="row" align="center">
                <Fab onClick={() => handleRemoveSet(set.set_number)} size="small" color="warning" aria-label="remove">
                  <RemoveIcon />
                </Fab>
              </TableCell>
              <TableCell component="th" scope="row" align="center">{set.set_number}</TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  value={set.weight}
                  onChange={(e) => updateSetWeight(e.currentTarget.value, set.set_number)}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  value={set.repetitions}
                  onChange={(e) => updateSetRepetitions(e.currentTarget.value, set.set_number)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="outlined" color="primary" sx={{ width: 250, my: 1 }} onClick={handleAddSet}><AddIcon />&nbsp;Ajouter une série</Button>
      <Button variant="outlined" color="primary" sx={{ width: 330, mb: 0.5 }} onClick={toggleAcordion}>Valider</Button>
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
};
