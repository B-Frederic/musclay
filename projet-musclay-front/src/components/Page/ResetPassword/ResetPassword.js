import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Card, CircularProgress, FormControl, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetPassword } from '../../../actions/resetPassword';
import DisplayMsg from '../../UI/Display/DisplayMsg';
import { Link } from 'react-router-dom';
import { blueGrey } from '@mui/material/colors';
import { blueDark } from '../../../theme/theme2';
import { setUserIsLoading } from '../../../actions/user';

function ResetPassword() {
  const dispatch = useDispatch();
  const { responseMessage, error, darkTheme, isLoading } = useSelector((state) => state.userReducer);
  // Validation schéma of Yup :
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email invalide')
      .required("L'email est obligatoire"),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(setUserIsLoading(true));
      dispatch(sendResetPassword(values));
    },
  });

  return (
    <Box sx={{
      my: 'auto',
      width: '100vw',
      height: '100%',
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
        justifyContent: 'stretch',
        alignItems: 'center',
        px: { xs: 0, sm: 5 },
        py: 2,
        borderRadius: { xs: 0, sm: '10px' },
        width: { xs: '100%', sm: 'auto' },
        height: { xs: '100%', sm: 'auto' },
      }}
      >
        <Box sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', my: 2,
        }}
        >
          <Typography component="p" variant="h5" textAlign="center">Reinitialiser le mot de passe</Typography>
        </Box>
        { responseMessage && <DisplayMsg message={responseMessage} type="success" vertical="bottom" horizontal="right" />}
        { error.isError && <DisplayMsg message={error.errorMsg} type="warning" vertical="bottom" horizontal="right" />}
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
            <Box sx={{ mt: 2, position: 'relative'}}>
                  <Button type="submit" variant="contained" disabled={isLoading} sx={{ width: '100%' }}>Réinitialiser le mot de passe</Button>
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
          </Box>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 1 }}>Retour à la page de Connexion</Button>
        </FormControl>
      </Card>
    </Box>
  )
}

export default ResetPassword;
