import { TextFieldProps } from '@mui/material';
import { PatternFormatProps } from 'react-number-format';

export type FormattedInputProps = Omit<PatternFormatProps<TextFieldProps>, 'format'> & {
  format?: string;
  mask?: string;
  defaultValue?: string;
};
