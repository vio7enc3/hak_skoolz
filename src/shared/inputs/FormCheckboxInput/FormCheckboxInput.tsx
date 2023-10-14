import { Controller, FieldValues } from 'react-hook-form';
import { BaseControllerInputProps } from '../types';
import { Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps } from '@mui/material';

type Props = Omit<FormControlLabelProps, 'control'> & {
  CheckBoxProps?: CheckboxProps;
};

const FormCheckboxInput = <T extends FieldValues>(props: BaseControllerInputProps<T, Props>) => {
  const { control, name, CheckBoxProps, ...rest } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormControlLabel
            {...field}
            checked={field.value ?? false}
            control={<Checkbox {...CheckBoxProps} />}
            sx={{}}
            {...rest}
          />
        );
      }}
    />
  );
};

export default FormCheckboxInput;
