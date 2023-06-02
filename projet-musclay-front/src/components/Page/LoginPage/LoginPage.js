import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
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
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  userLogin, setUserTheme, setResponseMessage, setUserIsLoading,
} from '../../../actions/user';
import GoogleButton from '../../UI/GoogleButton/GoogleButton';
import Logo from '../../UI/Logo/Logo';
import ModalWithoutConnexion from '../../Modal/ModalWithoutConnexion';
import ThemeSwitch from '../../UI/ThemeSwitch/ThemeSwitch';
import DisplayError from '../../UI/Display/DisplayError';
import DisplayMsg from '../../UI/Display/DisplayMsg';
import { reSendLinkMailVerifiction } from '../../../actions/emailVerification';
import DisplayNewVerificationLink from '../../UI/Display/DisplayNewVerificationLink';

function LoginPage() {
  const {
    isLogged, error, darkTheme, responseMessage, isLoading
  } = useSelector((state) => state.userReducer);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const emailVerification = useLocation().pathname;

  useEffect(() => {
    if (emailVerification !== undefined) {
      if (emailVerification === '/email-already-verified') {
        dispatch(setResponseMessage('Votre email est déjà vérifié.'));
      }
      if (emailVerification === '/email-verified') {
        dispatch(setResponseMessage('Votre email est à présent vérfié, vous pouvez vous connecter.'));
      }
    }
  }, [emailVerification]);

  const handleTheme = (check) => {
    dispatch(setUserTheme(check));
  };

  // Validation schéma of Yup :
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('email invalide')
      .required("l'email est obligatoire"),
    password: Yup.string()
      .required('Mot de passe est obligatoire')
      .min(6, 'Mot de passe doit être plus grand que 6 caractères')
      .max(50, 'Mot de passe doit être plus petit que 50 caractères'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(userLogin(values));
    },
  });

  // Send new verification link to the user
  const handleReSendLink = () => {
    dispatch(setUserIsLoading(true));
    dispatch(reSendLinkMailVerifiction(formik.values));
  };

  // Redirect user if he's logged
  if (isLogged) {
    return <Navigate to="/accueil" />;
  }

  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

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

          {error.isError && <DisplayError errorsArray={error.errorMsg} type="warning" vertical="bottom" horizontal="right" />}
          {/* RESEND LINK EMAIL IF STATUS 403  */}
          { error.status === 403 && <DisplayNewVerificationLink onClick={handleReSendLink} /> }

          { responseMessage && <DisplayMsg message={responseMessage} type="success" vertical="bottom" horizontal="right" />}

          <FormControl>
            <Box component="form" sx={{ flexDirection: 'column', display: 'flex' }} onSubmit={formik.handleSubmit}>
              <TextField
                id="email"
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ my: '6px' }}
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
                sx={{ my: '6px' }}
              />
              <Stack spacing={2} direction="column">
                <Button type="submit" variant="contained" sx={{ mt: 1 }}>Se connecter&nbsp;&nbsp;<PersonIcon /></Button>
                <Typography align="center">
                  <Typography variant="body3" component={Link} to="/reset-password">Mot de passe oublié ?</Typography>
                </Typography>
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                >
                  Continuer sans s'enregistrer
                </Button>
                <Root>
                  <Divider>Ou</Divider>
                </Root>
                <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'flex-start', m: 0 }}>
                  <GoogleButton text="signin_with" />
                </Stack>
                <Typography variant="body2"> Vous n'avez pas de compte ?&nbsp;
                  <Typography component={Link} to="/inscription" variant="body3">S'enregistrer</Typography>
                </Typography>
              </Stack>
            </Box>
          </FormControl>
        </Card>
      </Box>
    </>
  );
}

export default LoginPage;
