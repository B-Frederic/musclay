import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  Stack, Typography,
  FormControl, Button, TextField, Autocomplete, Chip, Box,
} from '@mui/material/';

import {
  getTags, createTraining,
  setCreatedTraining, setTrainings,
} from '../../../actions/trainingsList';

function CreateTraining() {
  const [trainingName, setTrainingName] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const trainingsStates = useSelector((state) => state.trainingsListReducer);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTags());
  }, []);

  const tagsToSend = trainingsStates.tags.filter((tag) => selectedTags.includes(tag.name));

  // user without account limit to 2 trainings max
  if (userState.userWithoutAccount) {
    if (trainingsStates.trainings.length > 1) return <Navigate to="/accueil/entrainement/" />;
  }

  const handleSaveTraining = (e) => {
    e.preventDefault();
    if (!userState.userWithoutAccount) dispatch(createTraining(trainingName, tagsToSend));
    // user without account
    if (userState.userWithoutAccount) {
      const maxTrainingId = trainingsStates.trainings.reduce((max, training) => {
        // eslint-disable-next-line no-param-reassign
        max = training.id > max ? training.id : max;
        return max;
      }, 0);
      const newTraining = {
        id: maxTrainingId + 1,
        name: trainingName,
        tags: tagsToSend,
      };
      const newTrainings = [...trainingsStates.trainings];
      newTrainings.push(newTraining);
      dispatch(setTrainings(newTrainings));
      dispatch(setCreatedTraining(newTraining));
      localStorage.setItem('trainings', JSON.stringify(newTrainings));
    }
  };

  if (trainingsStates.createdTraining.id) {
    return <Navigate to={`/accueil/entrainement/${trainingsStates.createdTraining.id}/modifierseance/`} />;
  }

  return (
    <div className="container">
      <Typography component="h2" variant="h2" sx={{ mt: 3 }}>Créer un entraînement</Typography>
      <Box component="form" onSubmit={(e) => handleSaveTraining(e)}>
        <FormControl>
          <TextField value={trainingName} onChange={(e) => (setTrainingName(e.currentTarget.value))} sx={{ mb: 5, mt: 5 }} label="Nom de l'entraînement" variant="outlined" />
          <Stack sx={{ width: 280, mb: 5, mt: 1 }} spacing={10} direction="column">
            <Autocomplete
              multiple
              id="tags-filled"
              value={selectedTags}
              onChange={(e, value) => setSelectedTags(value)}
              options={trainingsStates.tags.map((tag) => tag.name)}
              renderTags={(value, getTagProps) => value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Tags"
                />
              )}
            />
          </Stack>
          <Button
            type="submit"
            sx={{
              my: 2,
            }}
            color="primary"
            variant="contained"
          >Créer un entraînement
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}

export default CreateTraining;
