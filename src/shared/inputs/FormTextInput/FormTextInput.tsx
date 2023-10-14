import React, { useState } from 'react';
import { ButtonBase, TextField, TextFieldProps } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

import { ReactComponent as VisibilityIcon } from '@/app/assets/icons/eye.svg';
import { ReactComponent as EyeSlashIcon } from '@/app/assets/icons/eye-slash.svg';

import { BaseControllerInputProps } from '../types';
import { useTranslation } from 'react-i18next';

export const FormTextInput = <T extends FieldValues>(
  props: BaseControllerInputProps<T, TextFieldProps>
) => {
  const { control, name, onChange, rules, regExp, type: inputType, ...rest } = props;
  const { t } = useTranslation();
  const [type, setType] = useState<TextFieldProps['type']>(inputType ? 'password' : 'text');

  const handleClickShowPassword = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...rules,
        required: rules?.required === true ? t('errors:required_field') : rules?.required,
      }}
      render={({ field: { value = '', ...field }, fieldState }) => {
        const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.value && regExp && !regExp.test(event.target.value)) return;
          onChange?.(event);
          field.onChange(event);
        };

        return (
          <TextField
            type={type}
            value={value}
            {...rest}
            {...field}
            onChange={onChangeHandler}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            InputProps={{
              endAdornment: inputType && (
                <ButtonBase onClick={handleClickShowPassword} disableRipple>
                  {type === 'password' ? <VisibilityIcon /> : <EyeSlashIcon />}
                </ButtonBase>
              ),
            }}
          />
        );
      }}
    />
  );
};
