import { ButtonBase, TextField, TextFieldProps } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { ReactComponent as VisibilityIcon } from '@/app/assets/icons/eye.svg';
import { ReactComponent as EyeSlashIcon } from '@/app/assets/icons/eye-slash.svg';

const PasswordInput = forwardRef<HTMLDivElement, Omit<TextFieldProps, 'type'>>((props, ref) => {
  const [type, setType] = useState<TextFieldProps['type']>('password');

  const handleClickShowPassword = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <TextField
      type={type}
      {...props}
      ref={ref}
      InputProps={{
        endAdornment: (
          <ButtonBase onClick={handleClickShowPassword} disableRipple>
            {type === 'password' ? <VisibilityIcon /> : <EyeSlashIcon />}
          </ButtonBase>
        ),
      }}
    />
  );
});

export default PasswordInput;
