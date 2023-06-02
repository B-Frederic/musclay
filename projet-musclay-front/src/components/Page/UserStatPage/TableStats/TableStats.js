import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableStats({ userStats, tableHeaders }) {
  return (
    <TableContainer component={Paper} sx={{ mb: 2, mt: 2 }}>
      <Table sx={{ minWidth: 'auto' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => <TableCell key={header} align="center">{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {userStats.map((stat) => (
            <TableRow key={stat.id}>
              <TableCell component="th" scope="row" align="center">{stat.set_number}</TableCell>
              <TableCell align="center">{stat.weight}</TableCell>
              <TableCell align="center">{stat.repetitions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableStats.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  userStats: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
