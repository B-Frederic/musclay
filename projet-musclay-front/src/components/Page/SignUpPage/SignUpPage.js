import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import {
  TextField,
  FormControl,
  Button,
  Box,
  Stack,
  Typography,
  Card,
  Divider,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { userRegister, setUserTheme, setUserIsLoading } from '../../../actions/user';
import GoogleButton from '../../UI/GoogleButton/GoogleButton';
import Logo from '../../UI/Logo/Logo';
import ModalWithoutConnexion from '../../Modal/ModalWithoutConnexion';
import ThemeSwitch from '../../UI/ThemeSwitch/ThemeSwitch';
import DisplayError from '../../UI/Display/DisplayError';
import DisplayMsg from '../../UI/Display/DisplayMsg';
import Loader from '../../UI/Loader/Loader';
import { blueGrey } from '@mui/material/colors';
import { blueDark } from '../../../theme/theme2';

function LoginPage() {
  const {
    isLogged, error, darkTheme, responseMessage,
    isLoading,
  } = useSelector((state) => state.userReducer);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();

  const handleTheme = (check) => {
    dispatch(setUserTheme(check));
  };

  // Validation schéma of Yup :
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Le pseudo doit faire minimum 4 caractères')
      .max(15, 'Le pseudo trop long (15 caractères maximum)')
      .required('Le pseudo est requis'),
    email: Yup.string()
      .email('Email invalide')
      .required("L'email est obligatoire"),
    password: Yup.string()
      .required('Mot de passe est obligatoire')
      .min(6, 'Mot de passe doit être plus grand que 6 caractères')
      .max(50, 'Mot de passe doit être plus petit que 50 caractères'),
    password_confirmation: Yup.string()
      .required('Champ obligatoire')
      .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent être identique'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(setUserIsLoading(true));
      dispatch(userRegister(values));
    },
  });
  useEffect(() => {
    if (responseMessage !== null) {
      formik.resetForm({});
    }
  }, [responseMessage]);

  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

  if (isLogged) {
    return <Navigate to="/accueil" />;
  }

  return (
    <>
      <FormControlLabel
        sx={{ position: 'absolute', right: 1, top: 1 }}
        checked={darkTheme}
        onChange={(e) => handleTheme(e.target.checked)}
        control={<ThemeSwitch sx={{ m: 1 }} />}
      />
      <ModalWithoutConnexion open={open} setOpen={setOpen} />
      <Box sx={{
        my: { xs: 'auto', sm: 'auto' },
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Card sx={{
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'center', sm: 'stretch' },
          alignItems: 'center',
          px: { xs: 0, sm: 5 },
          py: 3,
          borderRadius: { xs: 0, sm: '10px' },
          width: { xs: '100%', sm: 'auto' },
          minHeight: { xs: '100vh', sm: 'auto' },
        }}
        >
          <Box sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', my: 4,
          }}
          >
            <Logo width="300px" height="100px" />
            <Typography component="p" variant="h5" textAlign="center" sx={{ mt: 2 }}>Muscle ton corps de lâche !</Typography>
          </Box>
          {error.isError && <DisplayError errorsArray={error.errorMsg} type="warning" vertical="bottom" horizontal="right" /> }
          {responseMessage && <DisplayMsg message={responseMessage} type="info" horizontal="right" vertical="bottom" />}

          <FormControl>
            <Box component="form" sx={{ flexDirection: 'column', display: 'flex' }} onSubmit={formik.handleSubmit}>
              <TextField
                id="name"
                name="name"
                type="text"
                label="Pseudo"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ m: '6px' }}
              />
              <TextField
                id="email input"
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ m: '6px' }}
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Mot de passe"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ m: '6px' }}
              />
              <TextField
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                label="Confirmer mot de passe"
                variant="outlined"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                sx={{ m: '6px' }}
              />
              <Stack spacing={2} direction="column">
                <Box sx={{ mt: 2, position: 'relative' }}>
                  <Button type="submit" variant="contained" disabled={isLoading} sx={{ width: '100%' }}>S'enregistrer</Button>
                  {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: darkTheme ? blueGrey[100] : blueDark[500],
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                  )}
                </Box>
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                >
                  Continuer sans s'enregistrer
                </Button>
                <Root>
                  <Divider>Ou</Divider>
                </Root>
                <Button component={Link} to="/" variant="contained" sx={{ mt: 1 }}>Connexion</Button>
                <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'flex-start', m: 0 }}>
                  <GoogleButton text="signin_with" />
                </Stack>
              </Stack>
            </Box>
          </FormControl>
        </Card>
      </Box>
    </>
  );
}

export default LoginPage;
