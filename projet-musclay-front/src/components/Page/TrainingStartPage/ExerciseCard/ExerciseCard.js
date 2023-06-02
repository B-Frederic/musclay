import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SetsTab from '../SetsTab/SetsTab';

function ExerciseCard({
  name,
  sets,
  index,
  selectedExercises,
  setSelectedExercises,
  exercisesSets,
  setExercisesSets,
  // Timer Props
  secondsToTime,
  sessionTime,
  playPause,
  workingChrono,
  resetFunc,
  setWorkingChrono,
  handleOpenClock,
}) {
  const [expand, setExpand] = useState(false);

  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  const handleCheckValidate = () => {
    const newExercisesSets = [...exercisesSets];
    newExercisesSets[index].validate = !newExercisesSets[index].validate;
    setExercisesSets(newExercisesSets);
  };

  return (
    <Accordion
      expanded={expand}
      sx={{
        width: '350px', mb: 2, pb: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
    >
      <AccordionSummary
        sx={{ width: '100%'}}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={name}
        id={name}
        onClick={toggleAcordion}
      >
        <Typography sx={{ mx: 'auto', my: 'auto' }}>{name}</Typography>
        <Checkbox checked={exercisesSets[index].validate} sx={{ mx: 'auto' }} onClick={handleCheckValidate} />
      </AccordionSummary>
      <AccordionDetails sx={{
        maxWidth: '350px',
        pb: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <SetsTab
          index={index}
          sets={sets}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          exercisesSets={exercisesSets}
          setExercisesSets={setExercisesSets}
          toggleAcordion={toggleAcordion}
          // Timer props
          secondsToTime={secondsToTime}
          sessionTime={sessionTime}
          playPause={playPause}
          workingChrono={workingChrono}
          resetFunc={resetFunc}
          setWorkingChrono={setWorkingChrono}
          handleOpenClock={handleOpenClock}
        />
      </AccordionDetails>
    </Accordion>
  );
}

ExerciseCard.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  sets: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  selectedExercises: PropTypes.object.isRequired,
  setSelectedExercises: PropTypes.func.isRequired,
  exercisesSets: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  setExercisesSets: PropTypes.func.isRequired,
  secondsToTime: PropTypes.func.isRequired,
  sessionTime: PropTypes.number.isRequired,
  playPause: PropTypes.func.isRequired,
  workingChrono: PropTypes.bool.isRequired,
  resetFunc: PropTypes.func.isRequired,
  setWorkingChrono: PropTypes.func.isRequired,
  handleOpenClock: PropTypes.func.isRequired,
};

export default ExerciseCard;
