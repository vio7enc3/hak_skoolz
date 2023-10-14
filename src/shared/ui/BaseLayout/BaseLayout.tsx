import React, { FC, PropsWithChildren } from 'react';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Box, Container, Stack, SxProps, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowLeftIcon } from '@/app/assets/icons/arrow_left.svg';
import { Colors } from '@/app/constants';
import { useTranslation } from 'react-i18next';

interface Props {
  customHeader?: React.ReactNode;
  noPadding?: boolean;
  sx?: SxProps;
  backLink?: string;
}

export const BaseLayout: FC<PropsWithChildren<Props>> = ({
  children,
  customHeader = <Header />,
  noPadding,
  sx,
  backLink,
}) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {customHeader}
      {backLink && (
        <Container sx={{ mt: 2 }}>
          <Box component='div' maxWidth='max-content'>
            <Link to={backLink} style={{ textDecoration: 'none' }}>
              <Stack
                direction='row'
                alignItems='center'
                spacing={1}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Box
                  sx={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '100%',
                    backgroundColor: Colors.LIGHT_BLUE,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box component={ArrowLeftIcon} />
                </Box>
                <Typography variant='h3'>{t('back')}</Typography>
              </Stack>
            </Link>
          </Box>
        </Container>
      )}

      <Box
        component='main'
        sx={{
          flex: '1',
          py: noPadding ? 0 : 5,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
