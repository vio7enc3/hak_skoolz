import React from 'react';
import { Box, ButtonBase, Stack, Typography, styled } from '@mui/material';
import { LangSwitcher } from '@/widgets/header/ui/LangSwitcher/LangSwitcher';
import ProfileMenu from '@/shared/ProfileMenu/ProfileMenu';
import { Sidebar } from '../sidebar';

import { useAppSelector } from '@/app/hooks';
import { BackBtn } from '@/shared/back-btn';

import { Colors, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH } from '@/app/constants';
interface Props {
  children: React.ReactNode;
  title?: string;
  backLink?: string;
}

const ButtonBaseComp = styled(ButtonBase)(() => ({
  borderRadius: '6px',
  backgroundColor: '#fff',
  width: '42px',
  height: '42px',
}));

export const CabinetLayout: React.FC<Props> = ({ title, children, backLink }) => {
  const { sidebarCollapsed } = useAppSelector((state) => state.app);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
      id='cabinet-layout'
    >
      <Sidebar />
      <Box
        component='main'
        sx={{
          p: 2.5,
          backgroundColor: '#F2F5FA',
          flex: 1,
          ml: sidebarCollapsed ? `${SIDEBAR_COLLAPSED_WIDTH}px` : `${SIDEBAR_EXPANDED_WIDTH}px`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        id='cabinet-layout-main'
      >
        <Stack component='header' direction='row' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' spacing={2}>
            {backLink && <BackBtn to={backLink} />}
            <Typography variant='h2'>{title}</Typography>
          </Stack>
          <Stack direction='row' spacing={2}>
            <ButtonBaseComp>
              <LangSwitcher
                variant='contained'
                hideChevron
                component='div'
                TypographyProps={{
                  sx: {
                    fontWeight: 600,
                    color: Colors.TEXT_SECONDARY,
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                  },
                }}
              />
            </ButtonBaseComp>
            <ProfileMenu />
          </Stack>
        </Stack>
        <Box
          sx={{
            mt: 3.75,
            flex: 1,
          }}
          component='div'
          id='cabinet-layout-content'
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
