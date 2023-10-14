import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { FormattedInputProps } from '../FormatedInput/types';
import FormatedInput from '../FormatedInput/FormatedInput';
import { BaseControllerInputProps } from '../types';
import { useTranslation } from 'react-i18next';

const FormFormattedInput = <T extends FieldValues>(
  props: BaseControllerInputProps<T, FormattedInputProps>
) => {
  const { control, name, onChange, rules, InputProps, ...rest } = props;
  const { t } = useTranslation();

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
          <FormatedInput
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

export default FormFormattedInput;
