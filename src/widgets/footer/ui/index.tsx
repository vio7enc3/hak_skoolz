import React from 'react';
import { Box } from '@mui/material';

import { Colors } from '@/app/constants';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box component='div' maxHeight={450} bgcolor={Colors.BG_DARK}>
      <Box component='div' maxWidth={1228} m='4.28rem auto'></Box>
    </Box>
  );
};
