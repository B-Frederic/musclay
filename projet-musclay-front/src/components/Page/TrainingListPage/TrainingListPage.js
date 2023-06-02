import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Box, Typography, Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../../UI/Loader/Loader';
import { getTrainings } from '../../../actions/trainingsList';
import FilterDrawer from './FilterDrawer/FilterDrawer';
import TrainingCard from './TrainingCard/TrainingCard';

export default function TrainingListPage() {
  const trainingsState = useSelector((state) => state.trainingsListReducer);
  const userState = useSelector((state) => state.userReducer);
  const [filter, setFilter] = useState({ name: '', tags: [] });
  const [filteredTrainings, setFilteredTrainings] = useState(false);
  const dispatch = useDispatch();

  let filteredArray;
  // Display menu from :
  const anchor = 'right';

  useEffect(() => {
    // Load trainings if user is logged
    if (userState.isLogged && !trainingsState.isLoaded) {
      dispatch(getTrainings());
    }
  }, [userState.isLogged]);

  useEffect(() => {
    // Filter on training Name AND Tag name
    if (filter.name !== '' && filter.tags.length !== 0) {
      filteredArray = trainingsState.trainings.filter((training) => {
        let valid = '';
        valid = (filter.tags.reduce((isSelected, tag) => {
          const tagArray = training.tags.map((t) => t.name);
          // eslint-disable-next-line no-param-reassign
          isSelected = isSelected && tagArray.includes(tag);
          return isSelected;
        }, true));
        return valid;
      });
      const filterByNameAndTag = filteredArray.filter((training) => training.name === filter.name);
      setFilteredTrainings(filterByNameAndTag);
    }
    // Filter on Tag name only
    else if (filter.tags.length !== 0) {
      const filterByTags = trainingsState.trainings.filter((training) => {
        let valid = '';
        valid = (filter.tags.reduce((isSelected, tag) => {
          const tagArray = training.tags.map((t) => t.name);
          // eslint-disable-next-line no-param-reassign
          isSelected = isSelected && tagArray.includes(tag);
          return isSelected;
        }, true));
        return valid;
      });
      setFilteredTrainings(filterByTags);
    }
    // Filter on training Name only
    else if (filter.name !== '') {
      const filterByName = trainingsState.trainings.filter(
        (training) => training.name === filter.name,
      );
      setFilteredTrainings(filterByName);
    }
  }, [filter]);

  // Props for filterDrawer (training name)
  const traniningsName = trainingsState.trainings.map((training) => training.name);
  const traniningsTags = [];
  trainingsState.trainings.forEach((data) => data.tags.forEach((t) => traniningsTags.push(t.name)));
  // Props for filterDrawer (tag name)
  const tags = [...new Set(traniningsTags)];
  // trainings mapped in Card
  const trainingsToMap = filteredTrainings || trainingsState.trainings;

  return (

    <div className="container">
      {userState.userWithoutAccount && <Alert severity="info" sx={{ my: 1 }}>Vous utilisez l'application sans être connecté</Alert>}
      {(!trainingsState.isLoaded && !userState.userWithoutAccount) && <Loader />}
      {(trainingsState.isLoaded || userState.userWithoutAccount) && (
        <>
          <Typography component="h2" variant="h2" sx={{ m: 3 }}>Entraînements</Typography>
          <Box sx={{
            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
          >
            <FilterDrawer
              anchor={anchor}
              setFilter={setFilter}
              tags={tags}
              trainingsName={traniningsName}
              setFilteredTrainings={setFilteredTrainings}
            />
            {trainingsToMap.map((training) => <TrainingCard {...training} key={training.id} />)}
            <Button
              component={Link}
              to="/accueil/entrainement/creer"
              variant="contained"
              disabled={(userState.userWithoutAccount && trainingsState.trainings.length > 1)}
              sx={{
                width: {
                  lg: '470px', xs: '350px',
                },
                mb: 4,
                mt: 2,
              }}
            >Créer un entrainement
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}
