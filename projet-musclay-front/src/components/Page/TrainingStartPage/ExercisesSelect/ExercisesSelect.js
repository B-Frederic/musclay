import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, List, AppBar, Toolbar, IconButton, Typography, Slide, Tabs, Tab, Box, Fab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs({ ExercisesData, selectedExercises, setSelectedExercises }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Change selected exercise state
  const handleExerciseSelectButton = (exerciseId) => {
    const newSelectedExercises = { ...selectedExercises };
    newSelectedExercises[exerciseId].isSelected = !newSelectedExercises[exerciseId].isSelected;
    setSelectedExercises({ ...newSelectedExercises });
  };

  return (
    <Box
      sx={{
        flexGrow: 1, bgcolor: 'background.paper', display: 'flex',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {ExercisesData.map(
          (muscleGroup) => (
            <Tab key={muscleGroup.name} label={muscleGroup.name} {...a11yProps(muscleGroup.id)} />
          ),
        )}
      </Tabs>
      {ExercisesData.map(
        (muscleGroup) => (
          <TabPanel key={muscleGroup.name} value={value} index={muscleGroup.id - 1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
              {muscleGroup.exercises.map(
                (exercise) => (
                  <Box
                    key={exercise.name}
                    sx={{
                      width: { md: 500, xs: 210 }, display: 'flex', justifyContent: 'space-between', mb: 1,
                    }}
                  >
                    <Typography sx={{
                      width: { md: 400, xs: 170 },
                    }}
                    >{exercise.name}
                    </Typography>
                    {selectedExercises[exercise.id].isSelected
                      ? (
                        <Fab size="small" color="warning" aria-label="remove" onClick={() => handleExerciseSelectButton(exercise.id)}>
                          <RemoveIcon />
                        </Fab>
                      )
                      : (
                        <Fab size="small" color="primary" aria-label="add" onClick={() => handleExerciseSelectButton(exercise.id)}>
                          <AddIcon />
                        </Fab>
                      )}
                  </Box>
                ),
              )}
            </Box>
          </TabPanel>
        ),
      )}
    </Box>
  );
}

VerticalTabs.propTypes = {
  ExercisesData: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  selectedExercises: PropTypes.object.isRequired,
  setSelectedExercises: PropTypes.func.isRequired,
};

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ExercisesSelect({
  open, setOpen, ExercisesData, selectedExercises, setSelectedExercises, exercisesSets,
  setExercisesSets,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveExercise = () => {
    // delete no selected exercise
    let newExercisesSets = exercisesSets.filter((exerciseSets) => (
      selectedExercises[exerciseSets.id].isSelected
    ));
    // put on an array all existing exercise
    const existingExerciseId = {};
    newExercisesSets.forEach((exercise) => {
      existingExerciseId[exercise.id] = true;
    });
    //
    Object.keys(selectedExercises).forEach((exerciseId) => {
      if (selectedExercises[exerciseId].isSelected && !existingExerciseId[exerciseId]) {
        newExercisesSets = [...newExercisesSets,
          {
            id: +exerciseId,
            name: selectedExercises[exerciseId].name,
            comment: '',
            score: 0,
            validate: false,
            sets:
            [
              {
                set_number: 1,
                weight: 0,
                repetitions: 0,
                validate: false,
              },
            ],
          }];
      }
    });

    setExercisesSets(newExercisesSets);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar color="primary" sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Exercices
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSaveExercise}>
              Valider
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <VerticalTabs
            ExercisesData={ExercisesData}
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
          />
        </List>
      </Dialog>
    </div>
  );
}

ExercisesSelect.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  ExercisesData: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  selectedExercises: PropTypes.object.isRequired,
  setSelectedExercises: PropTypes.func.isRequired,
  exercisesSets: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  setExercisesSets: PropTypes.func.isRequired,
};
