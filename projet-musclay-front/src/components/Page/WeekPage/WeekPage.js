/* eslint-disable no-else-return */
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useDrag, useDrop, DndProvider,
} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { TouchBackend } from 'react-dnd-touch-backend';
import {
  Chip,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getTrainings } from '../../../actions/trainingsList';
import { getPlanning, updateLinkTrainingPlanning } from '../../../actions/planning';
import Loader from '../../UI/Loader/Loader';

const COLUMN_NAMES = {
  TRAININGS: 'Entraînements',
  MORNING: 'Matin',
  MIDDAY: 'Midi',
  NIGHT: 'Soir',
};

// Component who will drag
function MovableItem({
  trainingName,
  id,
  trainingId,
  column,
  setItems,
}) {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      // We check if the training already exist or not on the same cell to avoid duplicate training
      const isExist = prevState.reduce(
        (exist, item) => exist
         || (currentItem.trainingId === item.trainingId
          && item.column === columnName
          && columnName !== COLUMN_NAMES.TRAININGS
          && columnName !== 'delete'),
        false,
      );
      if (isExist) return prevState;

      // We duplicate training if it comes from trainings cell
      if (columnName !== COLUMN_NAMES.TRAININGS && columnName !== 'delete' && currentItem.column === COLUMN_NAMES.TRAININGS) {
        const newArr = [...prevState];
        newArr.push(
          { ...currentItem, id: uuidv4(), column: columnName },
        );
        return newArr;
      }
      // We move training if it comes from another planning cell
      else if
      (columnName !== COLUMN_NAMES.TRAININGS && columnName !== 'delete' && currentItem.column !== COLUMN_NAMES.TRAININGS) {
        return prevState.map((item) => {
          if (item.id !== currentItem.id) return item;
          return ({
            ...item,
            column: item.name === currentItem.name ? columnName : item.column,
          });
        });
      }
      // We delete training if it dropped on trainings cell
      else if
      (columnName === COLUMN_NAMES.TRAININGS && currentItem.column !== COLUMN_NAMES.TRAININGS) {
        const newArr = [...prevState];
        const indexToDel = newArr.findIndex((item) => item.id === currentItem.id);
        newArr.splice(indexToDel, 1);
        return newArr;
      }
      // We delete training if it dropped anywhere out of planning
      else if
      (columnName === 'delete' && currentItem.column !== COLUMN_NAMES.TRAININGS) {
        const newArr = [...prevState];
        const indexToDel = newArr.findIndex((item) => item.id === currentItem.id);
        newArr.splice(indexToDel, 1);
        return newArr;
      }
      else {
        return prevState;
      }
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'box',
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'box',
    item: {
      id, trainingName, trainingId, column,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const { name } = dropResult;
        changeItemColumn(item, name);
      }
      else changeItemColumn(item, 'delete');
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  const cursor = isDragging ? 'grabbing' : 'grab';

  drag(drop(ref));

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { column !== COLUMN_NAMES.TRAININGS
        ? (<Chip component={Link} to={`/accueil/entrainement/${trainingId}/demarrerseance/`} label={trainingName} color="primary" ref={ref} sx={{ m: 0.5, opacity, cursor }} />)
        : (<Chip label={trainingName} color="primary" ref={ref} sx={{ m: 0.5, opacity, cursor }} />)}
    </>
  );
}

MovableItem.propTypes = {
  trainingName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  trainingId: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  setItems: PropTypes.func.isRequired,
};

// Container wich will receive the drop element
function Column({ children, title, name }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'box',
    drop: () => ({ name: name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getOpacity = () => {
    if (isOver) {
      if (canDrop) {
        return '0.2';
      }
    }
    return '1';
  };

  return (
    <Box
      ref={drop}
      sx={{
        m: `${title === COLUMN_NAMES.TRAININGS ? '16px' : '0px'}`,
        minWidth: `${title === COLUMN_NAMES.TRAININGS ? '350px' : '140px'}`,
        width: '100%',
        minHeight: `${title === COLUMN_NAMES.TRAININGS ? '' : '145px'}`,
        opacity: getOpacity(),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2">{title}</Typography>
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: `${title === COLUMN_NAMES.TRAININGS ? 'row' : 'column'}`,
        justifyContent: `${title === COLUMN_NAMES.TRAININGS ? 'center' : 'flex-start'}`,
      }}
      >
        {children}
      </Box>
    </Box>
  );
}

Column.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

let idToPlanning = {};
let planningToId = {};

export function WeekPage() {
  const trainingsState = useSelector((state) => state.trainingsListReducer);
  const userState = useSelector((state) => state.userReducer);
  const planningState = useSelector((state) => state.planningReducer);
  const dispatch = useDispatch();
  const [items, setItems] = useState(trainingsState.trainings);

  useEffect(() => {
    // Load trainings if user is logged
    if (userState.isLogged && !trainingsState.isLoaded) {
      dispatch(getTrainings());
    }
    // Load planning if user is logged
    if (userState.isLogged && !planningState.isLoaded) {
      dispatch(getPlanning());
    }
    // build 2 hash tab for planning id name conversion
    if (trainingsState.isLoaded && planningState.isLoaded) {
      idToPlanning = {};
      planningToId = {};
      planningState.planning.forEach((planning) => {
        idToPlanning = { ...idToPlanning, [planning.id]: planning.name };
        planningToId = { ...planningToId, [planning.name]: planning.id };
      });

      let idToTraining = {};
      const trainingsList = trainingsState.trainings.map((training) => {
        idToTraining = { ...idToTraining, [training.id]: training.name };
        return (
          {
            ...training,
            column: COLUMN_NAMES.TRAININGS,
            id: `${training.id}`,
            trainingId: `${training.id}`,
            trainingName: training.name,
          }
        );
      });

      const relTrainingPlanning = planningState.relTrainingPlanning.map((linkPlanning) => (
        {
          column: idToPlanning[linkPlanning.planning_id],
          id: uuidv4(),
          trainingId: `${linkPlanning.training_id}`,
          trainingName: idToTraining[linkPlanning.training_id],
        }));
      setItems([...trainingsList, ...relTrainingPlanning]);
    }
  }, [userState.isLogged, trainingsState.isLoaded, planningState.isLoaded]);

  const handleSavePlanning = () => {
    const filteredItems = items.filter((item) => (item.column !== COLUMN_NAMES.TRAININGS));
    const planningToSend = filteredItems.map((item) => (
      { training_id: +item.trainingId, planning_id: planningToId[item.column] }));
    dispatch(updateLinkTrainingPlanning(planningToSend));
  };

  const handleResetPlanning = () => {
    dispatch(updateLinkTrainingPlanning([]));
  };

  const returnItemsForColumn = (columnName) => items
    .filter((item) => item.column === columnName)
    .map((item) => (
      <MovableItem
        key={item.id}
        id={item.id}
        trainingName={item.trainingName}
        column={item.column}
        setItems={setItems}
        trainingId={item.trainingId}
      />
    ));

  const {
    TRAININGS, MORNING, MIDDAY, NIGHT,
  } = COLUMN_NAMES;

  const daysOfWeek = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ];

  const daysOfWeekUkOrder = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];

  const d = new Date();
  const today = d.getDay();

  return (
    <div className="container">
      {(!trainingsState.isLoaded || !planningState.isLoaded) && <Loader />}
      {(trainingsState.isLoaded && planningState.isLoaded) && (
      // <DndProvider
      //   backend={TouchBackend}
      //   options={{ enableMouseEvents: true }}
      // >
      <DndProvider backend={HTML5Backend}>
        <Typography component="h2" variant="h2" sx={{ m: 1 }}>Planning</Typography>
        <Column title={TRAININGS} name={TRAININGS}>
          {returnItemsForColumn(TRAININGS)}
        </Column>
        <TableContainer component={Paper} sx={{ width: '90%', my: 1 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {daysOfWeek.map((day) => (
                  <TableCell key={day} align="center" sx={{ backgroundColor: `${daysOfWeekUkOrder[today] === day ? '#1AA251' : ''}` }}>
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {daysOfWeek.map((day) => (
                  <TableCell key={`${day}-${MORNING}`} align="center">
                    <Column key={`${day}-${MORNING}`} name={`${day}-${MORNING}`} title={`${MORNING}`}>
                      {returnItemsForColumn(`${day}-${MORNING}`)}
                    </Column>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {daysOfWeek.map((day) => (
                  <TableCell key={`${day}-${MIDDAY}`} align="center">
                    <Column key={`${day}-${MIDDAY}`} name={`${day}-${MIDDAY}`} title={`${MIDDAY}`}>
                      {returnItemsForColumn(`${day}-${MIDDAY}`)}
                    </Column>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {daysOfWeek.map((day) => (
                  <TableCell key={`${day}-${NIGHT}`} align="center">
                    <Column key={`${day}-${NIGHT}`} name={`${day}-${NIGHT}`} title={`${NIGHT}`}>
                      {returnItemsForColumn(`${day}-${NIGHT}`)}
                    </Column>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={handleResetPlanning}
          variant="contained"
          color="error"
          sx={{
            width: {
              lg: '470px', xs: '350px',
            },
            display: {
              md: 'flex', xs: 'none',
            },
            mt: 1,
          }}
        > Réinitialiser le planning
        </Button>
        <Button
          onClick={handleSavePlanning}
          variant="contained"
          color="success"
          sx={{
            width: {
              lg: '470px', xs: '350px',
            },
            display: {
              md: 'flex', xs: 'none',
            },
            mb: 2,
            mt: 2,
          }}
        >Enregistrer le planning
        </Button>
      </DndProvider>
      )}
    </div>
  );
}

export default WeekPage;
