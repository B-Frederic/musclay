import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import styles from './App.module.css';
import LoginPage from '../Page/LoginPage/LoginPage';
import SignUpPage from '../Page/SignUpPage/SignUpPage';
import UserStatPage from '../Page/UserStatPage/UserStatPage';
import EditProfilPage from '../Page/EditProfilPage/EditProfilPage';
import TrainingListPage from '../Page/TrainingListPage/TrainingListPage';
import Dashboard from '../Page/Dashboard/Dashboard';
import CreateTraining from '../Page/CreateTraining/CreateTraining';
import NavBar from '../Layout/NavBar/NavBar';
import Footer from '../Layout/Footer/Footer';
// import SessionPage from '../Page/SessionPage/SessionPage';
import SetsEditPage from '../Page/SetsEditPage/SetsEditPage';
import TrainingEditPage from '../Page/TrainingEditPage/TrainingEditPage';
import TrainingStartPage from '../Page/TrainingStartPage/TrainingStartPage';
import FaqPage from '../Page/FaqPage/FaqPage';
import ContactPage from '../Page/ContactPage/ContactPage';
import { userRefreshToken, setUserTheme } from '../../actions/user';
import { brandingDarkTheme } from '../../theme/theme2';
import ErrorPage from '../Page/ErrorPage/ErrorPage';
import PrivateUser from './PrivateUser';
import PrivateUserWithoutAccount from './PrivateUserWithoutAccount';
import About from '../Page/About/About';
import WeekPage from '../Page/WeekPage/WeekPage';
import ResetPassword from '../Page/ResetPassword/ResetPassword';
import SetNewPassword from '../Page/ResetPassword/SetNewPassword';


function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.userReducer.isLogged);
  const darkTheme = useSelector((state) => state.userReducer.darkTheme);

  useEffect(() => {
    // If there is an user token in local storage and user is not connected , we refresh token
    if (localStorage.getItem('token') && !isLogged) {
      dispatch(userRefreshToken());
    }
  }, [isLogged]);

  return (
    <ThemeProvider theme={brandingDarkTheme(darkTheme ? 'dark' : 'light')}>
      <CssBaseline />
      <div className={styles.app}>
        {((location.pathname === '/') || (location.pathname === '/inscription') || (location.pathname === '/email-already-verified') || (location.pathname === '/email-verified')) ? (<></>) : <NavBar />}
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/email-already-verified" element={<LoginPage />} />
          <Route path="/email-verified" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<SetNewPassword />} />
          <Route path="/inscription" element={<SignUpPage />} />
          <Route path="/apropos" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
          <Route element={<PrivateUserWithoutAccount />}>
            <Route path="/accueil" element={<Dashboard />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/accueil/entrainement" element={<TrainingListPage />} />
            <Route path="/accueil/entrainement/creer" element={<CreateTraining />} />
            <Route
              path="/accueil/entrainement/:trainingId/modifier"
              element={<TrainingEditPage />}
            />
            <Route
              path="/accueil/entrainement/:trainingId/modifierseance"
              element={<SetsEditPage />}
            />
            <Route
              path="/accueil/entrainement/:trainingId/demarrerseance"
              element={<TrainingStartPage />}
            />
          </Route>
          <Route element={<PrivateUser />}>
            <Route path="/profil" element={<EditProfilPage />} />
            <Route path="/accueil/stats" element={<UserStatPage />} />
            <Route path="/accueil/monplanning" element={<WeekPage />} />
          </Route>
        </Routes>
        {((location.pathname === '/') || (location.pathname === '/inscription') || (location.pathname === '/email-already-verified') || (location.pathname === '/email-verified')) ? (<></>) : <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
