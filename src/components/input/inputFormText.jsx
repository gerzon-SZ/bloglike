import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

const InputFormText = ({ name, label, control, rules, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
        minRows={5} // Adjust the number of rows as needed
          label={label}
          variant="outlined"
          fullWidth
          error={fieldState.invalid}
          helperText={fieldState.error ? fieldState.error.message : ''}
          {...field}
          {...rest}
        />
      )}
    />
  );
};

export default InputFormText;
