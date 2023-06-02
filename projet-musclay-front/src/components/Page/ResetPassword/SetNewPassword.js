import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Box, Button, Card, FormControl, TextField, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setNewPassword } from '../../../actions/resetPassword';
import DisplayMsg from '../../UI/Display/DisplayMsg';

function SetNewPassword() {
  const dispatch = useDispatch();
  const { responseMessage, error } = useSelector((state) => state.userReducer);
  const { token } = useParams();

  //* Validation schéma of Yup :

  const validationSchema = Yup.object().shape({
    token: Yup.string()
      .required('')
      .min(10),
    email: Yup.string()
      .email('Email invalide')
      .required("L'email est obligatoire"),
    password: Yup.string()
      .required('Mot de passe obligatoire')
      .min(6, '6 caractères minimum')
      .max(50, '50 caractères maximum'),
    password_confirmation: Yup.string()
      .required('Champ obligatoire')
      .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent être identique'),
  });

  axios.defaults.withCredentials = true;
  const formik = useFormik({
    initialValues: {
      email: '',
      token: token,
      password: '',
      password_confirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(setNewPassword(values));
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
          <Typography component="p" variant="h5" textAlign="center">Choisissez un nouveau mot de passe</Typography>
        </Box>
        { responseMessage && <DisplayMsg message={responseMessage} type="success" vertical="bottom" horizontal="right" />}
        { error.isError && <DisplayMsg message={error.errorMsg} type="warning" vertical="bottom" horizontal="right" />}

        <FormControl>
          <Box component="form" sx={{ flexDirection: 'column', display: 'flex' }} onSubmit={formik.handleSubmit}>
            <input hidden name="token" value={token} />
            <TextField
              id="email input"
              name="email"
              type="email"
              label="Email*"
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
              label="Mot de passe*"
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
              label="Confirmer mot de passe*"
              variant="outlined"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
              helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
              sx={{ m: '6px' }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 1 }}>Valider</Button>
          </Box>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 1 }}>Retour à la page de Connexion</Button>
        </FormControl>
      </Card>
    </Box>
  );
}

export default SetNewPassword;
