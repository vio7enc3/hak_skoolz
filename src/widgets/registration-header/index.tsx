import { AppBar, Box, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '@/app/assets/icons/header/edukidz-logo.svg';
import { ReactComponent as BriefCase } from '@/app/assets/icons/header/briefcase.svg';
import { ReactComponent as UsersIcon } from '@/app/assets/icons/header/users.svg';
import { ReactComponent as ProfileIcon } from '@/app/assets/icons/header/profile.svg';
import { ReactComponent as NotificationIcon } from '@/app/assets/icons/header/notifications.svg';

import { Colors } from '@/app/constants';
import { useTranslation } from 'react-i18next';

export const RegistrationHeader = () => {
  const { t } = useTranslation('header');

  return (
    <AppBar
      sx={{
        backgroundColor: Colors.TEXT_WHITE,
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
      }}
      position='relative'
    >
      <Container>
        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ py: 3 }}>
          <Box
            component={Link}
            to='#'
            sx={{
              display: 'flex',
            }}
          >
            <Box component={LogoIcon} />
          </Box>

          <Stack direction='row' spacing={4}>
            <Box component={Link} to='/login/teacher' sx={{ textDecoration: 'none' }}>
              <Stack direction='row' alignItems='center' spacing={1}>
                <Box component={BriefCase} />
                <Typography
                  sx={{
                    color: Colors.GRAY,
                    fontSize: '16px',
                  }}
                >
                  {t('nav.classes')}
                </Typography>
              </Stack>
            </Box>

            <Box component={Link} to='/login/pupil' sx={{ textDecoration: 'none' }}>
              <Stack direction='row' alignItems='center' spacing={1}>
                <Box component={UsersIcon} />
                <Typography
                  sx={{
                    color: Colors.GRAY,
                    fontSize: '16px',
                  }}
                >
                  {t('nav.rating')}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Stack direction='row' alignItems='center' spacing={2}>
            {/* <Box component={Link} to='/registration' sx={{ textDecoration: 'none' }}>
              <Typography>{t('registration')}</Typography>
            </Box>
            <Box component={Link} to='/login' sx={{ textDecoration: 'none' }}>
              <Typography>{t('login')}</Typography>
            </Box> */}
            <Box component={Link} to='#' sx={{ textDecoration: 'none' }}>
              <Box component={NotificationIcon} />
            </Box>
            <Box component={Link} to='#' sx={{ textDecoration: 'none' }}>
              <Box component={ProfileIcon} />
            </Box>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};
