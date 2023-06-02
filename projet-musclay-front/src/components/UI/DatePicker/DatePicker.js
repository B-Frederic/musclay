import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function ResponsiveDatePickers({
  label, width, value, onChange,
}) {
  // const [value, setValue] = React.useState(new Date());
  const date = value === '' ? new Date() : value;
  width || 'auto';

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        inputFormat="dd/MM/yyyy"
        label={label}
        value={date}
        locale="FR"
        onChange={(e) => {
          onChange(e);
        }}
        renderInput={(params) => <TextField {...params} sx={{ width: width }} />}
      />
    </LocalizationProvider>
  );
}

ResponsiveDatePickers.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};
