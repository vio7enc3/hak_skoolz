import React, { useMemo } from 'react';
import { AppBar, Box, ButtonBase, Container, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getHeaderNavData } from '../../lib/getHeaderNavData';
import { HeaderNavItem } from '@/shared/ui';

import { Colors } from '@/app/constants';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/app/hooks';

export const GeneralHeader: React.FC = () => {
  const { t } = useTranslation();
  const { isLogged, company, userType, user } = useAppSelector((state) => state.session);

  const navData = useMemo(() => getHeaderNavData(t), [t]);

  return (
    <AppBar
      sx={{
        backgroundColor: Colors.TEXT_WHITE,
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
      }}
      position='relative'
    >
      <Container>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{
            py: '13px',
          }}
        >
          <Box component={Link} to='/' sx={{ display: 'flex' }}>
            {/* <Logo /> */}
          </Box>
          <Box component='nav'>
            <Stack
              component='ul'
              direction='row'
              spacing={4}
              sx={{
                listStyle: 'none',
              }}
            >
              {navData.map((el, idx) => (
                <HeaderNavItem item={el} key={idx} />
              ))}
            </Stack>
          </Box>
          <Stack direction='row'>
            {isLogged ? (
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
                component={Link}
                to='/cabinet'
              >
                {/* <Box component={UserIcon} /> */}
                <Tooltip title={userType === 'company' ? company?.name : user?.name}>
                  <Typography
                    sx={{
                      maxWidth: '160px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: 500,
                    }}
                  >
                    {userType === 'company' ? company?.name : user?.name}
                  </Typography>
                </Tooltip>
              </Stack>
            ) : (
              <>
                <Box component={Link} to='/registration'>
                  <ButtonBase
                    sx={{
                      height: '40px',
                      px: '30px',
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: Colors.BLUE,
                      }}
                    >
                      {t('header.registration')}
                    </Typography>
                  </ButtonBase>
                </Box>
                <Box component={Link} to='/login'>
                  <ButtonBase
                    sx={{
                      height: '40px',
                      px: '30px',
                      borderRadius: '8px',
                      backgroundColor: Colors.PRIMARY,
                    }}
                  >
                    <Typography
                      color={Colors.DARK}
                      sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        lineHeight: '1.3rem',
                      }}
                    >
                      {t('header.login')}
                    </Typography>
                  </ButtonBase>
                </Box>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};
