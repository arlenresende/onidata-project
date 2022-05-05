import React, { useCallback } from 'react';

import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

// Material
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField, TextFieldProps } from '@mui/material';

import InputMask, { Props as InputProps2 } from 'react-input-mask';

type InputProps = TextFieldProps & {
  label: string;
  name: string;
  variant: 'standard' | 'filled' | 'outlined' | undefined;
  error?: boolean;
  errorString?: FieldError;
  component?: React.ReactNode;
  mask?: string | '';
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, errorString, error, variant, mask = '', ...props },
  ref
) => {
  const InputWithMask = useCallback((props: InputProps2): JSX.Element => {
    return <InputMask {...props} mask={mask} style={{ border: 'none' }} />;
  }, []);

  return (
    <>
      {mask ? (
        <TextField
          label={label}
          variant={variant}
          error={error && true}
          {...props}
          ref={ref}
          InputProps={{
            inputComponent: InputWithMask as any,
          }}
        />
      ) : (
        <TextField
          label={label}
          variant={variant}
          error={error && true}
          {...props}
          ref={ref}
        />
      )}
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

export const Input = forwardRef(InputBase);
