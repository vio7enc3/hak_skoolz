import { AutocompleteProps, TextFieldProps } from '@mui/material';

export type UISelectProps<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  'renderInput' | 'getOptionLabel'
> & {
  TextFieldProps?: TextFieldProps;
  getOptionLabel?: (option: T) => string;
};
