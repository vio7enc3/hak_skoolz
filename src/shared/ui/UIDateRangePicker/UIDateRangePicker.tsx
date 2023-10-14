import FormatedInput from '@/shared/inputs/FormatedInput/FormatedInput';
import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { ReactComponent as CalendarIcon } from '@/app/assets/icons/calendar.svg';
import { FormattedInputProps } from '@/shared/inputs/FormatedInput/types';

interface Props {
  TextFieldProps?: FormattedInputProps;
  dateFormat?: string;
  onChange: (dates: [Date | null, Date | null]) => void;
  value: [Date | null, Date | null];
}

export const UIDateRangePicker = forwardRef<{}, Props>(
  ({ TextFieldProps, dateFormat = 'dd.MM.yyyy', onChange, value }, ref) => {
    return (
      <ReactDatePicker
        //@ts-ignore
        ref={ref}
        dateFormat={dateFormat}
        selected={value[0]}
        startDate={value[0]}
        endDate={value[1]}
        onChange={onChange}
        selectsRange
        customInput={
          <FormatedInput
            format='##.##.#### - ##.##.####'
            fullWidth
            {...TextFieldProps}
            InputProps={{
              endAdornment: <CalendarIcon />,
              ...TextFieldProps?.InputProps,
              // value: dateValue ? dayjs(dateValue).format('DD.MM.YYYY') : '',
            }}
          />
        }
      />
    );
  }
);
