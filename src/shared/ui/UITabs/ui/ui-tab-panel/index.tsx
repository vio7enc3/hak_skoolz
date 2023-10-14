import { Box, SxProps } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  index: number;
  value: number;
  sx?: SxProps;
}

export const UITabPanel: React.FC<Props> = ({ children, value, index, sx, ...other }) => {
  return (
    <Box
      component='div'
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
      {...other}
      sx={{
        p: 3.75,
        flex: 1,
        ...(value === index && { display: 'flex', flexDirection: 'column' }),
        ...sx,
      }}
    >
      {value === index && children}
    </Box>
  );
};
