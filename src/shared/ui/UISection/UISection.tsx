import { Paper, PaperProps } from '@mui/material';
import React from 'react';

const UISection: React.FC<PaperProps> = ({ sx, elevation = 0, ...props }) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        borderRadius: '8px',
        padding: 3.75,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...props}
    />
  );
};

export default UISection;
