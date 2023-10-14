import { Autocomplete, TextField } from '@mui/material';
import React, { forwardRef } from 'react';
import { UISelectProps } from './types';
import { Colors } from '@/app/constants';

const Comp = <
  T,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>(
  props: UISelectProps<T, Multiple, DisableClearable, FreeSolo>,
  ref: React.ForwardedRef<{}>
) => {
  const { TextFieldProps, getOptionLabel, ...rest } = props;
  return (
    <Autocomplete
      {...rest}
      renderInput={(params) => <TextField {...params} {...TextFieldProps} />}
      //@ts-ignore
      getOptionLabel={getOptionLabel}
      ref={ref}
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: rest.disabled ? Colors.LIGHT_TURQUOISE : 'inherit',
        },
        ...rest.sx,
      }}
    />
  );
};

const UISelect = forwardRef(Comp) as <
  T,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>(
  props: UISelectProps<T, Multiple, DisableClearable, FreeSolo> & {
    ref?: React.ForwardedRef<{}>;
  }
) => React.ReactElement<UISelectProps<T, Multiple, DisableClearable, FreeSolo>>;

export default UISelect;
