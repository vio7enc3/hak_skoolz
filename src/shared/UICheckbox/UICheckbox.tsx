import React, { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';

interface UICheckboxProps {
  label?: string;
}

const UICheckbox: React.FC<UICheckboxProps> = ({ label }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox checked={isChecked} onChange={(_event, checked) => setIsChecked(checked)} />
        }
        label={label}
      />
    </FormControl>
  );
};

export default UICheckbox;
