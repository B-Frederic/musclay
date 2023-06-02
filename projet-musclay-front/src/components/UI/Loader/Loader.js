import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box sx={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    }}
    >
      <CircularProgress />
    </Box>
  );
}
