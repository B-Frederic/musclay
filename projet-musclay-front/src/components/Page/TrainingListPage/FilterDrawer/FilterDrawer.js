import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Autocomplete, Chip, IconButton, Stack, TextField, Typography,
} from '@mui/material';

const filterDrawer = ({
  anchor, tags, trainingsName, setFilter, setFilteredTrainings,
}) => {
  const [state, setState] = useState({ right: false });
  const [tagsFilter, setTagsFilter] = useState([]);
  const [trainingsNameFilter, setTrainingsName] = useState('');

  // Submit form
  const handleSubmitFormFilter = (e) => {
    e.preventDefault();
    if (tagsFilter.length !== 0 && trainingsNameFilter !== '') {
      setFilter({ name: trainingsNameFilter, tags: tagsFilter });
    }
    else if (tagsFilter.length !== 0) {
      setFilter({ name: '', tags: tagsFilter });
    }
    else if (trainingsNameFilter !== '') {
      setFilter({ name: trainingsNameFilter, tags: [] });
    }
    else {
      // If submit with no value , unset all states (refresh trainings)
      setTrainingsName('');
      setTagsFilter([]);
      setFilter({ name: '', tags: [] });
      setFilteredTrainings(false);
    }
  };

  /**
   * Set a default value if the input value is removed
   * @param {*} value the value to set
   * @param {*} setStateFunction the useState function to use
   * @param {*} defaultReturn the default value to return if value === null
   * @returns
   */
  const handleOnChangeInput = (value, setStateFunction, defaultReturn) => {
    if (value === null) {
      setStateFunction(defaultReturn);
      return;
    }
    setStateFunction(value);
  };

  // Third arg custom, used on 'supprimer les filtres' for close the drawer menu and setState
  const toggleDrawer = (anchor, open, suppr) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (suppr) {
      setTagsFilter([]);
      setTrainingsName('');
      setFilter({ name: '', tags: [] });
      setFilteredTrainings(false);
    }
    setState({ [anchor]: open });
  };

  return (
    <>
      <Button onClick={toggleDrawer(anchor, true)} variant="outlined" color="primary" sx={{ width: 200, mb: 2, mt: 2 }}>Filtrer<FilterAltIcon /></Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
          component="form"
          onSubmit={handleSubmitFormFilter}
          role="presentation"
          // onKeyDown={toggleDrawer(anchor, false)}
        >
          <IconButton sx={{ position: 'absolute', left: 0 }} onClick={toggleDrawer(anchor, false)}>
            <HighlightOffIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            align="center"
            sx={{
              display: 'flex', m: 1, alignItems: 'center', justifyContent: 'center',
            }}
          >Filtres
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack direction="column" sx={{ alignItems: 'center' }} spacing={2}>
            {/* Exercice Filter  */}

            <Autocomplete
              disablePortal
              id="trainings"
              value={trainingsNameFilter}
              onChange={(e, value) => handleOnChangeInput(value, setTrainingsName, '')}
              options={trainingsName}
              sx={{ width: '80%' }}
              renderInput={(params) => <TextField {...params} label="Nom de l'entraînement" />}
            />

            {/* Tag filter  */}

            <Autocomplete
              multiple
              id="tags-filled"
              sx={{ width: '80%' }}
              value={tagsFilter}
              onChange={(e, value) => handleOnChangeInput(value, setTagsFilter, [])}
              options={tags}
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
            {/* <DatePicker label="Date de création" width="80%" /> */}
            <Divider />
            <Button type="submit" onClick={toggleDrawer(anchor, false)} variant="contained" color="primary">Appliquer les filtres</Button>
            <Button type="button" onClick={toggleDrawer(anchor, false, true)} color="error">Supprimer les filtres</Button>
          </Stack>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
};

export default filterDrawer;
