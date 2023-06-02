import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, Divider, IconButton, Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import ExerciseCard from './ExerciseCard/ExerciseCard';
import ExercisesSelect from './ExercisesSelect/ExercisesSelect';
import Tags from '../../UI/Tags/Tags';
import { getExercises } from '../../../actions/exercises';
import { getSets, updateSets, setSets } from '../../../actions/sets';
import { getTrainings, setCreatedTraining } from '../../../actions/trainingsList';
import Loader from '../../UI/Loader/Loader';

export default function TrainingEditPage() {
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
              sets: sets[exerciseId],
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
      const setsToSend = [];
      exercisesSets.forEach((exercise) => {
        exercise.sets.forEach((set) => setsToSend.push({
          set_number: set.set_number,
          repetitions: set.repetitions,
          weight: set.weight,
          training_id: +trainingId,
          exercise_id: exercise.id,
        }));
      });
      const deleteSets = Object.keys(setsState.sets[trainingId] ?? {}).length > 0;
      dispatch(updateSets(trainingId, setsToSend, deleteSets));
    }

    // user without account
    if (userState.userWithoutAccount) {
      const newSets = { ...setsState.sets };
      newSets[trainingId] = {};
      exercisesSets.forEach((exercise) => {
        newSets[trainingId] = {
          ...newSets[trainingId],
          [exercise.id]: exercise.sets,
        };
      });
      dispatch(setSets(newSets));
      localStorage.setItem('sets', JSON.stringify(newSets));
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
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1.5 }}>
              <Typography gutterBottom variant="h5" component="div" sx={{ my: 'auto', maxWidth: { lg: '500px', sm: '320px', xs: '220px' }, overflow: { xs: 'hidden' }, whiteSpace: { xs: 'nowrap' }, textOverflow: { xs: 'ellipsis' } }}>
                {trainingToEdit && trainingToEdit.name}
              </Typography>
              <IconButton component={Link} to={`/accueil/entrainement/${trainingId}/modifier/`}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', position: 'relative', justifyContent: 'center' }}>
              {trainingToEdit && trainingToEdit.tags && <Tags tags={trainingToEdit.tags} />}
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
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Button
            onClick={handleSubmitSets}
            variant="contained"
            color="success"
            sx={{
              width: {
                lg: '470px', xs: '350px',
              },
              mb: 4,
              mt: 2,
            }}
          >Enregistrer l'entraînement
          </Button>
        </Box>
      )}
    </div>
  );
}
