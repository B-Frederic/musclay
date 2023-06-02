import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button, CardActions, IconButton, Box,
} from '@mui/material';
import Tags from '../../../UI/Tags/Tags';
import ModalDeleteTraining from '../../../Modal/ModalDeleteTraining';

export default function TrainingCard({ name, id, tags }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Card sx={{
      minWidth: 345,
      m: 2,
      width: {
        lg: '470px', xs: '350px',
      },
    }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <IconButton onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
          <Typography gutterBottom variant="h5" component="div" sx={{ mb: 0, width: { lg: '100%', sm: '250px', xs: '140px' }, overflow: { xs: 'hidden' }, whiteSpace: { xs: 'nowrap' }, textOverflow: { xs: 'ellipsis' } }}>
            {name}
          </Typography>
          <IconButton component={Link} to={`/accueil/entrainement/${id}/modifierseance/`}>
            <EditIcon />
          </IconButton>
        </Box>
        <Box sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
        }}
        >
          <Tags tags={tags} />
        </Box>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/accueil/entrainement/${id}/demarrerseance/`} size="medium" color="primary" variant="outlined" sx={{ width: '100%' }}>
          S'entraîner
        </Button>
      </CardActions>
      <ModalDeleteTraining
        open={open}
        setOpen={setOpen}
        id={id}
      />
    </Card>
  );
}

TrainingCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.array.isRequired,
};
