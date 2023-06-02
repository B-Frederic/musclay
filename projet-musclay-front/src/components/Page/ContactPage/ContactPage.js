import {
  TextField, FormControl, Button, Box, Typography, Alert, CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { sendContactForm, setContactIsLoading } from '../../../actions/contactUs';
import axios from 'axios';
import { useEffect } from 'react';
import { blueGrey } from '@mui/material/colors';
import { blueDark } from '../../../theme/theme2';
import DisplayError from '../../UI/Display/DisplayError';
import DisplayMsg from '../../UI/Display/DisplayMsg';

function ContactPage() {
  const { message, isLoading } = useSelector((state) => state.contactUsReducer);
  const { darkTheme, error } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, 'Le prénom doit faire minimum 3 caractères')
      .max(15, 'Le prénom trop long (15 caractères maximum)')
      .required('Prénom obligatoire'),
    lastname: Yup.string()
      .min(3, 'Le nom doit faire minimum 3 caractères')
      .max(15, 'Le nom trop long (15 caractères maximum)')
      .required('Nom obligatoire'),
    email: Yup.string()
      .email('email invalide')
      .required("L'email est obligatoire"),
    message: Yup.string()
      .required('Message obligatoire')
      .min(15, 'Message trop court ( min 15 caractères )')
      .max(300, 'Message trop long ( max 300 caractères )'),
  });
  // const mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const displaySuccessMsg = (msg) => <Alert severity="success" sx={{ mb: 2, justifyContent: 'center' }} key={msg}>{msg}</Alert>;
  const displayWaitingMsg = (msg) => <Alert severity="info" sx={{ mb: 2, justifyContent: 'center' }} key={msg}>{msg}</Alert>;
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      message: '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(setContactIsLoading(true));
      dispatch(sendContactForm(values));
    },
  });

  useEffect(() => {
    if (message !== null) {
      formik.resetForm({});
    }
  }, [message]);

  return (
    <div className="container">
      <Typography component="h2" variant="h2" sx={{ m: 3 }}>Contact</Typography>
      {error.errorMsg && <DisplayMsg message={error.errorMsg} type="warning" horizontal="right" vertical="bottom" />}
      {message && <DisplayMsg message={message} type="success" horizontal="right" vertical="bottom" />}
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', m: 2, width: { xs: '90%', sm: '80%', md: '60%', lg: '45%', xl: '35%' } }} onSubmit={formik.handleSubmit}>
        <Typography sx={{ fontSize: { xs: '14px', sm: '16px' }, p: 1 }} align="left" variant="overline">Veuillez entrer votre message :</Typography>
        <TextField
          name="firstname"
          id="firstname"
          type="text"
          label="Nom*"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
          variant="outlined"
          sx={{ m: '6px' }}
        />
        <TextField
          name="lastname"
          id="lastname"
          type="text"
          label="Prenom*"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
          variant="outlined"
          sx={{ m: '6px' }}

        />
        <TextField
          name="email"
          id="email"
          type="email"
          label="Email*"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="outlined"
          sx={{ m: '6px' }}

        />
        <TextField
          name="message"
          id="message"
          label="Commentaire*"
          value={formik.values.message}
          onChange={formik.handleChange}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          variant="outlined"
          min="10"
          multiline
          minRows={4}
          sx={{ m: '6px'}}
        />
        {/* <Button type="submit" variant="contained" sx={{ m: '6px' }}>Envoyer</Button> */}
        <Box sx={{ mt: 2, position: 'relative' }}>
          <Button type="submit" variant="contained" disabled={isLoading} sx={{ width: '100%' }}>Envoyer</Button>
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
    </div>
  );
}

export default ContactPage;
