import { Box, Stack, Typography } from '@mui/material';
import { ReactComponent as CallIcon } from '@/app/assets/icons/call.svg';
import { Colors } from '@/app/constants';

export const CallCenter = () => {
  return (
    <Stack direction='row' spacing={1.5} alignItems='center'>
      <Box component={CallIcon} sx={{ '& path': { fill: Colors.TEXT_SECONDARY } }} />
      <Typography color={Colors.TEXT_DARK} fontWeight={600}>
        (78) 148 49 00
      </Typography>
    </Stack>
  );
};
