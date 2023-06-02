import { useState, useEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, Divider, IconButton, Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import ExerciseCard from './ExerciseCard/ExerciseCard';
import ExercisesSelect from './ExercisesSelect/ExercisesSelect';
import Tags from '../../UI/Tags/Tags';
import { getExercises } from '../../../actions/exercises';
import { getSets } from '../../../actions/sets';
import { getTrainings, setCreatedTraining } from '../../../actions/trainingsList';
import { createStats } from '../../../actions/userStats';
import Chrono from './Chrono/Chrono';
import Loader from '../../UI/Loader/Loader';
import bip from '../../../assets/sounds/bip.wav';

export default function TrainingStartPage() {
  const { darkTheme } = useSelector((state) => state.userReducer);
  const exercisesState = useSelector((state) => state.exercisesReducer);
  const setsState = useSelector((state) => state.setsReducer);
  const trainingsState = useSelector((state) => state.trainingsListReducer);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Open drawer for exercises select menu
  const [open, setOpen] = useState(false);
  // Selected exercises state
  const [selectedExercises, setSelectedExercises] = useState({});
  // Exercises sets state
  const [exercisesSets, setExercisesSets] = useState([]);
  // Get training id from url
  const { trainingId } = useParams();
  // TrainingToEdit
  const [trainingToEdit, setTrainingToEdit] = useState({});

  // For Timer Modal
  const [openClock, setOpenClock] = useState(false);
  const handleOpenClock = () => setOpenClock(true);
  const handleCloseClock = () => setOpenClock(false);

  // Timer state
  const [sessionTime, setSessionTime] = useState(60);
  const [workingChrono, setWorkingChrono] = useState(false);
  const [sessionTimeFixed, setSessionTimeFixed] = useState('01:00');
  const [playBip] = useSound(bip, {
    playbackRate: 0.8,
    volume: 0.5,
  });
  const [playFinalBip] = useSound(bip, {
    playbackRate: 0.4,
    volume: 1,
  });

  // convert time to seconds
  const timeToSeconds = (time) => {
    const timeArr = time.split(':');
    return ((+timeArr[0] * 60) + (+timeArr[1]));
  };

  // convert time to seconds
  const secondsToTime = (totalSeconds) => {
    const minutes = `${Math.floor(totalSeconds / 60)}`;
    const seconds = `${totalSeconds % 60}`;
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  };

  const resetFunc = () => {
    if (workingChrono) {
      setWorkingChrono(!workingChrono);
    }
    setSessionTime(timeToSeconds(sessionTimeFixed));
  };

  function clockReducer(state, action) {
    switch (action.type) {
      case 'TICK':
        if (sessionTime >= 1) {
          if (sessionTime <= 5 && sessionTime > 1) playBip();
          if (sessionTime === 1) playFinalBip();
          setSessionTime(sessionTime - 1);
        }
        else {
          resetFunc();
        }
        break;
      default:
        break;
    }
  }

  // eslint-disable-next-line no-unused-vars
  const [state, clockDispatch] = useReducer(clockReducer);

  useEffect(() => {
    let id;
    if (workingChrono) {
      id = window.setInterval(() => {
        clockDispatch({ type: 'TICK' });
      }, 1000);
    }
    return () => {
      window.clearInterval(id);
    };
  }, [workingChrono]);

  const playPause = () => {
    setWorkingChrono(!workingChrono);
  };

  useEffect(
    () => {
      if (userState.isLogged) {
        if (!setsState.isLoaded) dispatch(getSets());
        // if there is not training on the state
        // or a new training is created we request trainings from database
        if ((!trainingsState.isLoaded) || trainingsState.createdTraining.id) {
          dispatch(getTrainings());
        }
      }
      if (!exercisesState.isLoaded) dispatch(getExercises());
      // we set newly created training to null object
      dispatch(setCreatedTraining({}));
    },
    [userState.isLogged],
  );

  useEffect(
    () => {
      if (exercisesState.exercises.length > 0) {
      // create initial state with all exercises not selected
        const selectedExercisesInit = {};
        exercisesState.exercises.forEach((muscleGroup) => {
          muscleGroup.exercises.forEach((exercise) => {
            selectedExercisesInit[exercise.id] = {
              name: exercise.name,
              isSelected: false,
            };
          });
        });

        const sets = setsState.sets[trainingId] ?? {};

        const exercises = [];

        if (Object.keys(sets).length > 0) {
          Object.keys(sets).forEach((exerciseId) => {
            selectedExercisesInit[exerciseId].isSelected = true;
            exercises.push({
              id: exerciseId,
              name: selectedExercisesInit[exerciseId].name,
              comment: '',
              score: 0,
              validate: false,
              sets: sets[exerciseId].map((set) => ({ ...set, validate: false })),
            });
          });
        }
        setSelectedExercises(selectedExercisesInit);
        setExercisesSets(exercises);
      }
      setTrainingToEdit(trainingsState.trainings.find((training) => training.id === +trainingId));
    },
    [exercisesState.isLoaded, setsState.isLoaded, trainingsState.isLoaded],
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmitSets = () => {
    if (!userState.userWithoutAccount) {
      const statsToSend = [];
      exercisesSets.forEach((exercise) => {
        exercise.sets.forEach((set) => statsToSend.push({
          set_number: set.set_number,
          repetitions: set.repetitions,
          weight: set.weight,
          score: exercise.score,
          comment: exercise.comment,
          exercise_id: exercise.id,
        }));
      });
      dispatch(createStats(statsToSend));
    }
    navigate('../accueil/entrainement/', { replace: true });
  };

  return (
    <div className="container">
      {userState.userWithoutAccount && <Alert severity="info" sx={{ my: 1 }}>Vous utilisez l'application sans être connecté</Alert>}
      {((!exercisesState.isLoaded
      || !setsState.isLoaded
      || !trainingsState.isLoaded) && (!exercisesState.isLoaded || !userState.userWithoutAccount))
      && <Loader />}
      {((exercisesState.isLoaded
      && setsState.isLoaded
      && trainingsState.isLoaded) || (exercisesState.isLoaded && userState.userWithoutAccount))
      && (
      <>
        <Chrono
          openClock={openClock}
          handleCloseClock={handleCloseClock}
          sessionTime={sessionTime}
          setSessionTime={setSessionTime}
          workingChrono={workingChrono}
          setWorkingChrono={setWorkingChrono}
          sessionTimeFixed={sessionTimeFixed}
          setSessionTimeFixed={setSessionTimeFixed}
          timeToSeconds={timeToSeconds}
          secondsToTime={secondsToTime}
          playPause={playPause}
          resetFunc={resetFunc}
        />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          flexGrow: 1,
        }}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{
              display: 'flex', my: 2, justifyContent: 'center', alignItems: 'center',
            }}
            >
              <Box />
              <Box sx={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', my: 2,
              }}
              >
                <Typography gutterBottom variant="h5" component="div" sx={{ width: { lg: '100%', sm: '320px', xs: '220px' }, overflow: { xs: 'hidden' }, whiteSpace: { xs: 'nowrap' }, textOverflow: { xs: 'ellipsis' } }}>
                  {trainingToEdit && trainingToEdit.name}
                </Typography>
                <Box sx={{ display: 'flex', position: 'relative', justifyContent: 'center' }}>
                  {trainingToEdit && trainingToEdit.tags && <Tags tags={trainingToEdit.tags} />}
                </Box>
              </Box>
            </Box>
            <Divider sx={{ width: '100%', my: 2 }} />
            <Button onClick={handleClickOpen} variant="outlined" color="primary" sx={{ width: 250, mb: 2 }}><AddIcon />&nbsp;Ajouter un exercice</Button>
            <ExercisesSelect
              open={open}
              setOpen={setOpen}
              ExercisesData={exercisesState.exercises}
              selectedExercises={selectedExercises}
              setSelectedExercises={setSelectedExercises}
              exercisesSets={exercisesSets}
              setExercisesSets={setExercisesSets}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
                alignItems: { xs: 'center', md: 'flex-start' },
                flexWrap: 'wrap',
              }}
            >
              {exercisesSets.map((exercise, index) => (
                <Box sx={{ m: 2 }} key={exercise.id}>
                  <ExerciseCard
                    {...exercise}
                    index={index}
                    selectedExercises={selectedExercises}
                    setSelectedExercises={setSelectedExercises}
                    exercisesSets={exercisesSets}
                    setExercisesSets={setExercisesSets}
                    // Timer props
                    secondsToTime={secondsToTime}
                    sessionTime={sessionTime}
                    playPause={playPause}
                    workingChrono={workingChrono}
                    resetFunc={resetFunc}
                    setWorkingChrono={setWorkingChrono}
                    handleOpenClock={handleOpenClock}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Button
            onClick={handleSubmitSets}
            disabled={userState.userWithoutAccount}
            variant="contained"
            color="success"
            sx={{
              width: {
                lg: '470px', xs: '350px',
              },
              mb: 4,
              mt: 2,
            }}
          >Enregistrer la séance
          </Button>
        </Box>
      </>
      )}
    </div>
  );
}
