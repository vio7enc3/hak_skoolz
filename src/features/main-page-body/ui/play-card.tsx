import React, { FC } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { IPlayCard } from '..';
import { Colors } from '@/app/constants';

export const PlayCardItem: FC<IPlayCard> = ({ bgColor, btnText, Icon, btnDisabled, title }) => {
  const { t } = useTranslation('');

  return (
    <Box
      component='div'
      sx={{ backgroundColor: bgColor, p: '24px 20px', borderRadius: '8px', minWidth: 700 }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <Stack direction='column' justifyContent='space-between'>
          <Typography variant='h2' color={Colors.TEXT_WHITE}>
            {title}
          </Typography>
          <Button
            disabled={btnDisabled}
            sx={{
              color: Colors.TURQUOISE,
              backgroundColor: Colors.TEXT_WHITE,
              ':hover': { backgroundColor: Colors.TEXT_WHITE },
            }}
          >
            {t(btnText)}
          </Button>
        </Stack>

        <Box component={Icon} />
      </Stack>
    </Box>
  );
};
