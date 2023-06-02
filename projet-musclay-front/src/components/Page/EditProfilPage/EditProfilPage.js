import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Label } from '@mui/icons-material';
import ModalDeleteAcount from '../../Modal/ModalDeleteAcount';

import {
  deleteUserAccount, deleteUserPicture, isUserProfilUpdated, setAuthError, setUserIsLoading, userUpdate,
} from '../../../actions/user';
import UploadFile from '../../UI/UploadFile/UploadFile';
import DisplayMsg from '../../UI/Display/DisplayMsg';
import DisplayError from '../../UI/Display/DisplayError';
import Loader from '../../UI/Loader/Loader';

function EditProfilPage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);
  const {
    error, user, isLoading, isGoogleUser, responseMessage,
  } = useSelector((state) => state.userReducer);

  const handleOpen = () => setOpen(true);

  const handleDeleteAccount = () => {
    dispatch(deleteUserAccount());
  };

  const handleDeletePicture = (e) => {
    e.preventDefault();
    dispatch(deleteUserPicture());
  };

  // Validation schéma of Yup :
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, '4 caractères minimum')
      .max(15, '15 caractères maximum')
      .required('Required'),
    email: Yup.string()
      .email('email invalide')
      .required("l'email est obligatoire"),
    newEmail: Yup.string()
      .email('email invalide'),
    password: Yup.string()
      .required('Mot de passe est obligatoire')
      .min(6, '6 caractères minimum'),
    newPassword: Yup.string()
      .min(6, '6 caractères minimum'),
    newPassword_confirmation: Yup.string().when('newPassword', {
      is: (val) => (!!(val && val.length > 0)),
      then: Yup.string().required('Confirmer le mot de passe').oneOf(
        [Yup.ref('newPassword')],
        'Les mots de passe doivent être identiques',
      ),
    }),
  });
    // If google user , password is not required to update
  if (isGoogleUser) {
    validationSchema = Yup.object().shape({
      name: Yup.string()
        .min(4, 'Le pseudo doit faire minimum 4 caractères')
        .max(15, 'Le pseudo trop long (15 caractères maximum)')
        .required('Required'),
    });
  }

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: '',
      newEmail: '',
      newPassword: '',
      newPassword_confirmation: '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(userUpdate(values));
      formik.values.newPassword = '';
      formik.values.newPassword_confirmation = '';
      window.scrollTo(0, 0);
    },
  });

  useEffect(() => {
    if (formik.values.newPassword !== '' || formik.values.newEmail !== '' || formik.values.name !== user.name) {
      setIsFormModified(true);
    }
    else {
      setIsFormModified(false);
    }
  }, [formik, user]);

  return (
    <div className="container">
      <Box sx={{ width: '100%', height: '100%' }}>
        {responseMessage && <DisplayMsg message={responseMessage} type="success" vertical="bottom" horizontal="right" />}
        {error.isError && <DisplayMsg message={error.errorMsg} type="warning" vertical="bottom" horizontal="right" />}
        <Typography component="h2" variant="h2" sx={{ m: 2 }}>Profil</Typography>
        <Box sx={{
          display: 'flex', flexDirection: { xs: 'column' }, justifyContent: 'space-around', alignItems: 'center',
        }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mb: 2,
                fontSize: '3rem',
              }}
              alt={user.name}
              src={user.picture}
            />
            <UploadFile />
          </Box>
          {user.picture && (
          <Box component="form" onSubmit={handleDeletePicture}>
            <Button sx={{ m: 1 }} color="error" type="submit" variant="contained">Supprimer mon avatar</Button>
          </Box>
          )}

          <Divider orientation="horizontal" flexItem sx={{ m: 2, display: { sx: 'none', lg: 'flex' } }} />
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', width: { xs: '90%', sm: '80%', md: '60%', lg: '45%', xl: '35%' }}}>
            <Typography sx={{ fontSize: 16, p: 1 }} align="left" variant="overline">Mes informations :</Typography>

            <TextField
              id="name"
              name="name"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              label="Pseudo"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ m: '6px' }}
            />
            {!isGoogleUser
            && (
            <>
              <TextField
                disabled={isGoogleUser}
                id="email"
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
                disabled={isGoogleUser}
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
              <Divider variant="fullWidth" sx={{ m: 1 }} />

              <Typography sx={{ fontSize: 16, p: 1 }} align="left" variant="overline">Modifier mon adresse mail :</Typography>
              <TextField
                disabled={isGoogleUser}
                id="newEmail"
                name="newEmail"
                type="email"
                label="Nouvel email"
                variant="outlined"
                value={formik.values.newEmail}
                onChange={formik.handleChange}
                error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
                helperText={formik.touched.newEmail && formik.errors.newEmail}
                sx={{ m: '6px' }}
              />

              <Typography sx={{ fontSize: 16, p: 1 }} align="left" variant="overline">Modifier mon mot de passe :</Typography>

              <TextField
                disabled={isGoogleUser}
                id="newPassword"
                name="newPassword"
                type="password"
                label="Nouveau mot de passe"
                variant="outlined"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
                sx={{ m: '6px' }}
              />
              <TextField
                disabled={isGoogleUser}
                id="newPassword_confirmation"
                name="newPassword_confirmation"
                type="password"
                label="Confirmer nouveau mot de passe"
                variant="outlined"
                value={formik.values.newPassword_confirmation}
                onChange={formik.handleChange}
                error={formik.touched.newPassword_confirmation && Boolean(formik.errors.newPassword_confirmation)}
                helperText={formik.touched.newPassword_confirmation && formik.errors.newPassword_confirmation}
                sx={{ m: '6px' }}
              />
            </>
            )}
            <Button sx={{ m: '6px', mt: 3 }} disabled={!isFormModified} type="submit" color="warning" variant="contained">Mettre à jour mes données</Button>
            <Button sx={{ m: '6px', mb: 3 }} onClick={handleOpen} variant="contained" color="error">Supprimer mon compte</Button>
            <ModalDeleteAcount
              open={open}
              setOpen={setOpen}
              onSubmit={handleDeleteAccount}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default EditProfilPage;
