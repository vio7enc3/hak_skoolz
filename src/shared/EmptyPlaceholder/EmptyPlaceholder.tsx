import { Box, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { ReactComponent as InboxIcon } from '@/app/assets/icons/inbox.svg';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/app/constants';

interface Props {
  Icon?: ReactNode;
  text?: string;
}

const EmptyPlaceholder: React.FC<Props> = ({ Icon = <InboxIcon />, text }) => {
  const { t } = useTranslation();

  if (!text) text = t('list_is_empty');

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Stack spacing={2} alignItems='center'>
        <Box
          sx={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.LIGHT_BLUE,
          }}
        >
          {Icon}
        </Box>
        <Typography variant='h4'>{text}</Typography>
      </Stack>
    </Box>
  );
};

export default EmptyPlaceholder;
