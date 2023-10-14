import React, { forwardRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { UIDatePickerProps } from './types';
import { ReactComponent as CalendarIcon } from '@/app/assets/icons/calendar.svg';
import dayjs from 'dayjs';
import FormatedInput from '@/shared/inputs/FormatedInput/FormatedInput';
import './UIDatePicker.sass';

const Comp = <
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined
>(
  props: UIDatePickerProps<CustomModifierNames, WithRange>,
  // _ref: React.LegacyRef<ReactDatePicker<CustomModifierNames, WithRange>>
) => {
  const {
    TextFieldProps,
    dateFormat = 'dd.MM.yyyy',
    isClearable = true,
    value = null,
    ...rest
  } = props;
  const [dateValue, setDateValue] = useState(value);

  useEffect(() => {
    setDateValue(value);
  }, [value]);

  return (
    <ReactDatePicker
      dateFormat={dateFormat}
      isClearable={isClearable && !rest.disabled}
      selected={dateValue}
      clearButtonClassName='ui-date-picker__clear-button'
      customInput={
        <FormatedInput
          mask='##.##.####'
          fullWidth
          {...TextFieldProps}
          InputProps={{
            endAdornment: <CalendarIcon />,
            ...TextFieldProps?.InputProps,
            value: dateValue ? dayjs(dateValue).format('DD.MM.YYYY') : '',
          }}
        />
      }
      {...rest}
    />
  );
};
const UIDatePicker = forwardRef(Comp) as <
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined
>(
  props: UIDatePickerProps<CustomModifierNames, WithRange> & {
    ref?: React.LegacyRef<ReactDatePicker<CustomModifierNames, WithRange>>;
  }
) => React.ReactElement<UIDatePickerProps<CustomModifierNames, WithRange>>;

export default UIDatePicker;
