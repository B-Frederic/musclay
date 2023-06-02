import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import {
  FormControl, Button, TextField, Autocomplete, Chip, Box, Typography, Alert,
} from '@mui/material';
import {
  getTags, getTrainings, updateTraining, setTrainings,
} from '../../../actions/trainingsList';
import Loader from '../../UI/Loader/Loader';

function EditTrainingPage() {
  const trainingsState = useSelector((state) => state.trainingsListReducer);
  const userState = useSelector((state) => state.userReducer);
  const [trainingName, setTrainingName] = useState('');
  const [startTags, setStartTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  // Get training id from url
  const { trainingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userState.isLogged) {
      if (!trainingsState.tags.isLoaded) dispatch(getTags());
      if (!trainingsState.isLoaded) dispatch(getTrainings());
    }
  }, [userState.isLogged]);

  useEffect(() => {
    if (trainingsState.trainings.length > 0) {
      const trainingToEdit = trainingsState.trainings.find(
        (training) => training.id === +trainingId,
      );
      setTrainingName(trainingToEdit.name);
      const trainingTags = trainingToEdit.tags.map((tag) => tag.name);
      setSelectedTags(trainingTags);
      setStartTags(trainingTags);
    }
  }, [trainingsState.isLoaded]);

  const tagsToSend = trainingsState.tags.filter((tag) => selectedTags.includes(tag.name));

  const handleUpdateTraining = (e) => {
    e.preventDefault();
    if (!userState.userWithoutAccount) {
      const editTags = JSON.stringify(startTags) !== JSON.stringify(selectedTags);
      const deleteTags = startTags.length > 0;
      // console.log(startTags, selectedTags, editTags);
      dispatch(updateTraining(trainingId, trainingName, tagsToSend, editTags, deleteTags));
    }
    // user without account
    if (userState.userWithoutAccount) {
      const newTrainings = [...trainingsState.trainings];
      const indexToReplace = newTrainings.findIndex((training) => training.id === +trainingId);
      const newTraining = {
        id: +trainingId,
        name: trainingName,
        tags: tagsToSend,
      };
      newTrainings.splice(indexToReplace, 1, newTraining);

      dispatch(setTrainings(newTrainings));
      localStorage.setItem('trainings', JSON.stringify(newTrainings));
    }
    navigate(`../accueil/entrainement/${trainingId}/modifierseance/`, { replace: true });
  };

  return (
    <div className="container">
      {userState.userWithoutAccount && <Alert severity="info" sx={{ my: 1 }}>Vous utilisez l'application sans être connecté</Alert>}
      {(!trainingsState.isLoaded && !userState.userWithoutAccount) && <Loader />}
      {(trainingsState.isLoaded || userState.userWithoutAccount) && (
        <>
          <Typography component="h2" variant="h2" sx={{ mt: 3 }}>Modifier l'entraînement</Typography>
          <Box component="form" onSubmit={(e) => handleUpdateTraining(e)}>
            <FormControl>
              <TextField value={trainingName} onChange={(e) => (setTrainingName(e.currentTarget.value))} sx={{ mb: 5, mt: 5 }} label="Nom de l'entraînement" variant="outlined" />
              <Stack sx={{ width: 280, mb: 5, mt: 1 }} spacing={10} direction="column">
                <Autocomplete
                  multiple
                  id="tags-filled"
                  value={selectedTags}
                  onChange={(e, value) => setSelectedTags(value)}
                  options={trainingsState.tags.map((tag) => tag.name)}
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
              >Modifier l'entraînement
              </Button>
            </FormControl>
          </Box>
        </>
      )}
    </div>
  );
}

export default EditTrainingPage;
