import { FormattedInputProps } from '@/shared/inputs/FormatedInput/types';
import { TextFieldProps } from '@mui/material';
import { ReactDatePickerProps } from 'react-datepicker';

export type UIDatePickerProps<
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined
> = Omit<ReactDatePickerProps<CustomModifierNames, WithRange>, 'value'> & {
  TextFieldProps?: FormattedInputProps;
  value?: Date | null;
};
