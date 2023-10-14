import React from 'react';
import { BaseLayout } from '@/shared/ui';
import { RegistrationHeader } from '@/widgets/registration-header';
import { Box, Container, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';

export const EntryPage = () => {
  const { t } = useTranslation('common');

  return (
    <BaseLayout customHeader={<RegistrationHeader />}>
      <Container>
        <Box
          component='div'
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant='h3'>{t('entry_page')}</Typography>
        </Box>
      </Container>
    </BaseLayout>
  );
};
