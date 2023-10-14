import { TextField } from '@mui/material';
import React, { forwardRef } from 'react';
import { PatternFormat } from 'react-number-format';
import { FormattedInputProps } from './types';

const FormatedInput: React.ForwardRefRenderFunction<HTMLInputElement, FormattedInputProps> = (
  { format = '(##) ###-##-##', ...rest },
  ref
) => {
  return <PatternFormat format={format} customInput={TextField} {...rest} inputRef={ref} />;
};

export default forwardRef(FormatedInput);
