import PropTypes from 'prop-types';
import {
  Card, CardContent, Rating, Typography, Box,
} from '@mui/material';
import TableStats from '../TableStats/TableStats';

function StatCard({ tableHeaders, stat }) {
  // option for date format
  const options = {
    timeZone: 'GMT',
  };
  const date = new Date(stat[0].created_at).toLocaleString('fr-FR', options);
  return (
    <Card sx={{ width: { xs: 350, lg: 'auto' }, mx: { xs: 2, lg: 5 }, my: 2 }}>
      <Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Montserrat' }}>
            {stat[0].exercise.name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontFamily: 'Montserrat' }}>
            {date}
          </Typography>

          <TableStats tableHeaders={tableHeaders} userStats={stat} />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
          >
            <Typography sx={{
              display: 'flex',
              alignItems: 'center',
              my: 1,
            }}
            >Note : <Rating readOnly value={stat[0].score} />
            </Typography>
            <Typography sx={{ my: 1, alignSelf: 'flex-start' }}>Commentaire : {stat[0].comment}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

StatCard.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  stat: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default StatCard;
