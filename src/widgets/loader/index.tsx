import React from 'react';
import { CircularProgress, CircularProgressProps, Stack } from '@mui/material';

type Props = CircularProgressProps;

export const CircularProgressComponent: React.FC<Props> = (props) => {
  return (
    <Stack direction='row' justifyContent='center' alignItems='center'>
      <CircularProgress color='success' {...props} />
    </Stack>
  );
};
