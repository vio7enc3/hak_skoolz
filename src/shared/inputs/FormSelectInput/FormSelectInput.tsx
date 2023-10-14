import { BaseControllerInputProps } from '../types';
import { Controller, FieldValues } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { UISelectProps } from '../UISelect/types';

import { ReactComponent as DownChevron } from '@/app/assets/icons/down-chevron.svg';
import { useTranslation } from 'react-i18next';

type Props<
  T extends FieldValues,
  V,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> = BaseControllerInputProps<T, UISelectProps<V, Multiple, DisableClearable, FreeSolo>>;

const FormSelectInput = <
  T extends FieldValues,
  V,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>({
  control,
  name,
  rules,
  TextFieldProps,
  onChange,
  ...rest
}: Props<T, V, Multiple, DisableClearable, FreeSolo>) => {
  const { t } = useTranslation();
  return (
    <Controller
      control={control}
      rules={{
        ...rules,
        required: rules?.required === true ? t('errors:required_field') : rules?.required,
      }}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Autocomplete
            {...rest}
            {...field}
            //@ts-ignore
            value={field.value || null}
            onChange={(event, option) => {
              field.onChange(option);
              //@ts-ignore
              onChange?.(event, option);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...TextFieldProps}
                error={fieldState.invalid}
                helperText={fieldState?.error?.message}
                variant='outlined'
              />
            )}
            popupIcon={<DownChevron />}
            sx={{
              '& .MuiAutocomplete-popupIndicator': {
                m: 'auto',
              },
            }}
            id='auction-form-select-input'
          />
        );
      }}
    />
  );
};

export default FormSelectInput;
