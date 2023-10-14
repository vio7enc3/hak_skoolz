import { Colors } from '@/app/constants';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: React.ReactNode;
  loginType?: 'ecp' | 'password';
}

const LoginLayout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation('login');

  return (
    <Box
      sx={{
        maxWidth: '480px',
        margin: '40px auto',
      }}
    >
      <Typography
        variant='h2'
        sx={{
          fontWeight: 700,
          fontSize: '1.86rem',
          textAlign: 'center',
          mb: 4,
        }}
      >
        {t('title')}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
};

export default LoginLayout;
