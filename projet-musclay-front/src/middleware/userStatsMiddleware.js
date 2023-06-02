/* eslint-disable no-case-declarations */
import axios from 'axios';
import { GET_STATS, setStats, CREATE_STATS, getStats, setStatsIsLoaded} from '../actions/userStats';

const backUrl = process.env.REACT_APP_BACK_URL;

const userStatsMiddleware = (store) => (next) => (action) => {
  // console.log(JSON.parse(localStorage.getItem('token')))
  const { token } = store.getState().userReducer;
  switch (action.type) {
    case GET_STATS:
      store.dispatch(setStatsIsLoaded(false));
      const optionsGetStats = {
        method: 'GET',
        url: `${backUrl}/api/user/statistics`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      axios.request(optionsGetStats)
        .then((response) => {
          const stats = response.data;
          // console.log(response);
          store.dispatch(setStats(stats));
        })
        .catch((error) => {
          console.error(error);
        }).finally(() => {
          store.dispatch(setStatsIsLoaded(true));
        });
      break;
    case CREATE_STATS:
      const optionsCreateStats = {
        method: 'POST',
        url: `${backUrl}/api/statistics`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: action.payload,
      };
      if (action.payload.length > 0) {
        axios.request(optionsCreateStats)
          // .then(() => {
          //   store.dispatch(getStats());
          // })
          .catch((error) => {
            console.error(error);
          }).finally(() => {
            store.dispatch(getStats());
          });
      }
      break;

    default:
      next(action);
  }
};

export default userStatsMiddleware;
