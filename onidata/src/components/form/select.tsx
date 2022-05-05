import React, { ReactNode } from 'react';

import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

// Material
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Select as SelectUi, SelectProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

type MySelectProps = SelectProps & {
  labelId: string;
  label: string;
  error: boolean;
  errorString?: FieldError;
  children: ReactNode;
};

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, MySelectProps> = (
  { children, label, errorString, error, labelId, ...rest },
  ref
) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <SelectUi
          labelId={labelId}
          label={label}
          error={error && true}
          {...rest}
          ref={ref}
        >
          {children}
        </SelectUi>
      </FormControl>
      {errorString && (
        <Box>
          <Typography variant="h6" mt={1} pl={1} fontSize={12}>
            {errorString.message}
          </Typography>
        </Box>
      )}
    </>
  );
};

export const Select = forwardRef(SelectBase);
