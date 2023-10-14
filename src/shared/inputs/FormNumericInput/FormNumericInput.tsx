import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { BaseControllerInputProps } from '../types';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { TextField, TextFieldProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

const FormNumericInput = <T extends FieldValues>(
  props: BaseControllerInputProps<T, NumericFormatProps<TextFieldProps>>
) => {
  const { t } = useTranslation();
  const { control, name, onChange, rules, InputProps, ...rest } = props;

  return (
    <Controller
      control={control}
      rules={{
        ...rules,
        required: rules?.required === true ? t('errors:required_field') : rules?.required,
      }}
      name={name}
      render={({ field: { ref, onChange: fieldOnChange, ...restField }, fieldState }) => {
        const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(event);
          fieldOnChange(event);
        };

        return (
          <NumericFormat
            decimalSeparator='.'
            customInput={TextField}
            {...rest}
            {...restField}
            onChange={onChangeHandler}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            InputProps={{
              ref: ref,
              ...InputProps,
            }}
          />
        );
      }}
    />
  );
};

export default FormNumericInput;
