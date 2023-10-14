import { Controller, FieldValues } from 'react-hook-form';
import { BaseControllerInputProps } from '../types';
import { useTranslation } from 'react-i18next';
import UIDatePicker from '@/shared/ui/UIDatePicker/UIDatePicker';
import dayjs from 'dayjs';
import { UIDatePickerProps } from '@/shared/ui/UIDatePicker/types';

type Props<
  T extends FieldValues,
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined
> = BaseControllerInputProps<
  T,
  Omit<UIDatePickerProps<CustomModifierNames, WithRange>, 'onChange'>
>;

function FormDatePicker<
  T extends FieldValues,
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined
>(props: Props<T, CustomModifierNames, WithRange>) {
  const { control, name, rules, TextFieldProps, disabled, ...rest } = props;
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...rules,
        required: rules?.required === true ? t('errors:required_field') : rules?.required,
      }}
      render={({ field, fieldState }) => {
        const onChange = (date: Date | null) => {
          const dateValue = dayjs(date).isValid() ? date : null;
          field.onChange(dateValue);
        };
        return (
          <UIDatePicker
            {...field}
            value={field.value ? dayjs(field.value).toDate() : null}
            {...rest}
            //@ts-ignore
            onChange={onChange}
            disabled={disabled}
            TextFieldProps={{
              error: fieldState.invalid,
              helperText: fieldState.error?.message,
              fullWidth: true,
              inputRef: field.ref,
              disabled: disabled,
              ...TextFieldProps,
            }}
          />
        );
      }}
    />
  );
}

export default FormDatePicker;
