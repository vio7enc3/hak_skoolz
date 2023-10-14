import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { ReactComponent as ClockIcon } from '@/app/assets/icons/header/clock-icon.svg';
import { Colors } from '@/app/constants';

const DateAndTime: React.FC = () => {
  dayjs.locale('ru');
  const [currentDate, setCurrentDate] = useState(dayjs().format('D MMMM YYYY'));
  const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(dayjs().format('D MMMM YYYY'));
      setCurrentTime(dayjs().format('HH:mm'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <Box component={ClockIcon} />
      <Typography
        component='p'
        color={Colors.TEXT_DARK}
        sx={{ fontWeight: '600', fontSize: '1rem', lineHeight: '1.3rem' }}
      >
        {currentTime}
      </Typography>
      <Typography
        component='p'
        color={Colors.TEXT_SECONDARY}
        sx={{ fontWeight: '400', fontSize: '1rem', lineHeight: '1.3rem' }}
      >
        {currentDate}
      </Typography>
    </Stack>
  );
};

export default DateAndTime;
