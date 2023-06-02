import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Backdrop,
  Alert,
  Divider,
  Paper,
} from '@mui/material';
// import ShowChartIcon from '@mui/icons-material/ShowChart';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import Chart from 'chart.js/auto';
import { Chart as ChartType, Line, Bar } from 'react-chartjs-2';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getStats } from '../../../actions/userStats';
import DatePicker from '../../UI/DatePicker/DatePicker';
import StatCard from './StatCard/StatCard';
import Loader from '../../UI/Loader/Loader';

function UserStatPage() {
  const dispatch = useDispatch();
  const { isLogged, darkTheme } = useSelector((store) => store.userReducer);
  const { stats, isLoaded } = useSelector((store) => store.userStatsReducer);
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const firstDayOfTheMonth = (year, month) => new Date(year, month, 1);

  const [selectedExercice, setSelectedExercice] = useState('');
  const [uniqueExercisesList, setUniqueExercisesList] = useState([]);

  // Date Filters
  const [startDate, setStartDate] = useState(firstDayOfTheMonth(year, month));
  const [endDate, setEndDate] = useState(new Date());
  // Stats filtered to map
  const [filteredStatistics, setFilteredStatistics] = useState([]);
  const [graphData, setGraphData] = useState({ name: '', weight: [], date: [] });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [typeChart, setTypeChart] = useState('line');
  // Cards header
  const tableHeaders = ['Série', 'Poids (kg)', 'Reps'];

  useEffect(() => {
    if (isLogged && !isLoaded) {
      dispatch(getStats());
    }
  }, [isLogged]);

  /**
   * Handler to set type of chart
   * @param {event} event
   * @param {string} type 'line' or 'bar'
   */
  const handleTypeChart = (event, type = null) => {
    const value = type === null ? event.target.value : type;
    setTypeChart(value);
  };

  /**
   * Click handler to sort Card asc or desc
   *
   * @param {*} sortDirection 'asc' or 'desc'
   * @param {*} arrayToFilter array to filter (Cards)
   * @returns
   */
  const handleSortCard = (sortDirection, arrayToFilter) => {
    const sortedCard = [...arrayToFilter];
    if (sortDirection === 'desc') {
      sortedCard.sort((a, b) => new Date(b[0].created_at).getTime() - new Date(a[0].created_at).getTime());
      return setFilteredStatistics(sortedCard);
    }
    if (sortDirection === 'asc') {
      sortedCard.sort((a, b) => new Date(a[0].created_at).getTime() - new Date(b[0].created_at).getTime());
      return setFilteredStatistics(sortedCard);
    }
  };

  /**
   * Return unique exercises name from an Array
   * @param {Array} statsArray Statistics array to filter
   * @returns Array of unique exercises name
   */
  const getUniqueExercises = (statsArray) => {
    const exercises = [];
    let uniqueExercises = [];
    if (statsArray.length !== 0) {
      statsArray.forEach((stat) => stat.forEach((s) => exercises.push(s.exercise.name)));
      uniqueExercises = [...new Set(exercises)];
    }
    return uniqueExercises;
  };

  /**
   * Filter Stats by a Start Date and End Date
   * @param {Array} arrayToFilter Stats array
   * @param {Date} startDateFilter Starting Date to filter exercises
   * @param {Date} endDateFilter Ending Date to filter exercises
   * @returns array
   */
  const filterByDate = (arrayToFilter, startDateFilter, endDateFilter) => arrayToFilter.filter((stat) => (new Date(stat[0].created_at).getTime() - new Date(startDateFilter.setHours(0, 0, 0)).getTime()) >= 0
        && (new Date(stat[0].created_at).getTime() - new Date(endDateFilter.setHours(23, 59, 59)).getTime()) <= 0);

  /**
   * Filter Stats by Name
   * @param {Array} arrayToFilter Stats array
   * @param {String} selectedExerciseState Exercise selected (useState)
   */
  const filterStatByExerciseSelected = (arrayToFilter, selectedExerciseState) => {
    const filtered = [];
    arrayToFilter.forEach((stat) => {
      const array = [];
      stat.forEach((s) => {
        if (s.exercise.name === selectedExerciseState) {
          array.push(s);
        }
      });
      if (array.length > 0) {
        filtered.push(array);
      }
    });
    return filtered;
  };

  useEffect(() => {
    if (stats.length !== 0) {
      const newStatsToFilterFrom = [];
      stats.forEach((s) => Object.keys(s).forEach((stat) => newStatsToFilterFrom.push(s[stat])));
      // Get array of unique exercise to display in Input
      setUniqueExercisesList(getUniqueExercises(newStatsToFilterFrom));
      const statsFilteredByDate = filterByDate(newStatsToFilterFrom, startDate, endDate);
      setFilteredStatistics(statsFilteredByDate);
      if (selectedExercice !== '') {
        const statsFilteredByDateAndExerciseSelected = filterStatByExerciseSelected(statsFilteredByDate, selectedExercice);
        return setFilteredStatistics(statsFilteredByDateAndExerciseSelected);
      }
    }
  }, [startDate, endDate, selectedExercice, stats]);

  /**
   * Return Array of Object with max weight lifted in a day from an exercise
   * date and exercise name
   * Used to display graph
   *
   * @param {Array} filteredStatistics Array to filter
   * @returns Array
   */
  const getMaxStatsFromAllStats = (filteredStats) => {
    const allMaxStatistics = [];
    filteredStats.forEach((sets) => {
      const statistics = { weight: [], date: '', name: '' };
      let isSupp = false;
      sets.forEach((set) => {
        const indexDouble = allMaxStatistics.findIndex((stat) => stat.name === set.exercise.name
        && stat.date === (new Date(set.created_at).toLocaleDateString('fr-FR', { timeZone: 'UTC' })));
        // Creation of datas in the object statistics
        statistics.weight.push(set.weight);
        statistics.date = new Date(set.created_at).toLocaleDateString('fr-FR', { timeZone: 'UTC' });
        statistics.name = set.exercise.name;
        // Find doublon in allMaxStatistics
        if (indexDouble !== -1 && allMaxStatistics[indexDouble].weight <= set.weight) {
          isSupp = true;
          allMaxStatistics[indexDouble].weight = set.weight;
        }
      });
      // If no doublon pushing new stat in allMaxStatistics array
      if (!isSupp) {
        statistics.weight = Math.max(...statistics.weight);
        allMaxStatistics.push(statistics);
      }
    });
    return allMaxStatistics;
  };

  useEffect(() => {
    const allMaxStatistics = getMaxStatsFromAllStats(filteredStatistics);
    const graph = { name: '', weight: [], date: [] };
    allMaxStatistics.reverse();
    allMaxStatistics.forEach((stat) => {
      if (stat.name === selectedExercice) {
        graph.name = selectedExercice;
        graph.weight.push(stat.weight);
        graph.date.push(stat.date);
      }
      setGraphData(graph);
    });
  }, [selectedExercice, filteredStatistics]);

  // Style modal
  const styleModalMobile = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 200,
    borderRadius: '15px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
    pb: 6,
  };

  const styleDesktop = {
    my: 'auto',
    p: 1,
    width: 486,
    height: 465,
    bgcolor: 'background.paper',
  };

  // Option Chart
  const optionsChart = {
    maintainAspectRatio: false,
    backgroundColor: ['red'],
    borderColor: ['rgba(255, 99, 132, 0.2)'],
    pointBorderColor: ['red'],
    pointBorderWidth: 1,
    plugins: {
      title: {
        display: true,
        text: graphData.name,
        color: darkTheme ? 'white' : 'black',
        font: {
          size: 22,
          weight: 'normal',
        },
      },
      legend: {
        onClick: null,
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  const data = {
    labels: graphData.date,
    datasets: [
      {
        label: '',
        data: graphData.weight,
      },
    ],
  };

  return (
    <Box className="container" sx={{ maxHeight: { lg: 'calc(100vh - 120px)' } }}>
      {!isLoaded && <Loader />}
      {isLoaded && (
      <>
        <Modal
          sx={{ display: 'flex' }}
          keepMounted
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div>
              {
                    selectedExercice !== ''
                      ? (
                        <Box sx={style}>
                          <ChartType
                            type={typeChart}
                            onChange={(e) => handleTypeChart(e)}
                            data={data}
                            options={optionsChart}
                          />
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                              sx={{
                                border: '1px solid blue', mt: 1, mr: 1, width: '70px',
                              }}
                              variant="contained"
                              size="small"
                              onClick={(e) => handleTypeChart(e, 'line')}
                            >Ligne
                            </Button>
                            <Button sx={{ border: '1px solid blue', mt: 1, width: '70px' }} variant="contained" size="small" onClick={(e) => handleTypeChart(e, 'bar')}>Barre</Button>
                          </Box>
                        </Box>
                      )
                      : (
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={styleModalMobile}>
                            <Alert severity="info" sx={{ textAlign: 'center', fontSize: '16px' }}>Veuillez sélectionner un exercice pour afficher le graphique</Alert>
                          </Box>
                        </Modal>
                      )
                    }
            </div>
          </Fade>
        </Modal>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '90%',
            height: { lg: 'calc(100vh - 120px)' },
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: '2rem',
            maxWidth: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: '1rem',
              width: { xs: '350px', lg: '100%' },
              justifyContent: 'space-between',
            }}
            >
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
              }}
              >
                <Autocomplete
                  disablePortal
                  id="exercices"
                  onInputChange={(event, value, reason) => reason === 'clear' && setSelectedExercice('')}
                  options={uniqueExercisesList}
                  sx={{ width: 280 }}
                  renderInput={(params) => <TextField onSelect={(e) => setSelectedExercice(e.target.value)} {...params} label="Exercices" />}
                />
                <Button sx={{ display: { lg: 'none', xs: 'flex' } }} variant="outlined" size="medium" onClick={handleOpen}>
                  <EqualizerOutlinedIcon fontSize="large" />
                </Button>
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
              }}
              >
                <Box sx={{ width: '150px' }}>
                  <DatePicker label="Début" value={startDate} onChange={setStartDate} />
                </Box>
                <Box sx={{ width: '150px' }}>
                  <DatePicker label="Fin" value={endDate} onChange={setEndDate} />
                </Box>
                <Box>
                  <p>Tri:</p>
                </Box>
                <Box sx={{
                  display: 'flex', flexDirection: 'column', mt: '-10px',
                }}
                >
                  <Button onClick={() => handleSortCard('asc', filteredStatistics)}><KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)' }} /></Button>
                  <Button onClick={() => handleSortCard('desc', filteredStatistics)}><KeyboardArrowRightIcon sx={{ transform: 'rotate(90deg)' }} /></Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider variant="middle" sx={{ width: { xs: 0, lg: '75%' }, my: 1 }} />
          <Box sx={{
            display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: { lg: 'space-around' }, alignItems: { xs: 'center', lg: 'stretch' }, width: '100%', height: '80%',
          }}
          >
            <Box sx={{
              overflowY: 'auto',
              width: { lg: '45%' },
            // mt: { lg: 7 },
            }}
            >
              {filteredStatistics.map((stat) => (
                <StatCard
                  key={stat[0].id}
                  stat={stat}
                  tableHeaders={tableHeaders}
                />
              ))}
            </Box>
            {/* <Divider orientation="vertical" flexItem sx={{ display: { sx: 'none', lg: 'flex' } }} /> */}
            <Box sx={{
              overflowY: 'auto',
              width: '45%',
              display: { lg: 'flex', xs: 'none' },
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
              {
            selectedExercice !== ''
              ? (
                <Paper sx={styleDesktop}>
                  <ChartType
                    type={typeChart}
                    onChange={(e) => handleTypeChart(e)}
                    data={data}
                    options={optionsChart}
                  />
                  <Box>
                    <Button sx={{ my: 2, mx: 1 }} variant="contained" size="small" onClick={(e) => handleTypeChart(e, 'line')}>Ligne</Button>
                    <Button sx={{ my: 2, mx: 1 }} variant="contained" size="small" onClick={(e) => handleTypeChart(e, 'bar')}>Barre</Button>
                  </Box>
                </Paper>
              )
              : (

                <Alert
                  sx={{ mx: 5, my: 'auto' }}
                  severity="info"
                >Veuillez sélectionner un exercice pour afficher le graphique
                </Alert>

              )
          }
            </Box>
          </Box>
        </Box>
      </>
      )}
    </Box>
  );
}

export default UserStatPage;
