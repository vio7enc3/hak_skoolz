import { Box, BoxProps } from '@mui/material';
import React from 'react';
import { SidebarNavItem } from './sidebar-nav-item';
import { getNavData } from '../lib/getNavData';
import { useTranslation } from 'react-i18next';

export const SidebarNav: React.FC<Omit<BoxProps, 'children'>> = (props) => {
  const { t } = useTranslation('sidebar');
  // const { cabinetType } = useAppSelector((state) => state.app);
  // const { userType } = useAppSelector((state) => state.session);
  const NAVDATA = getNavData(t);

  return (
    <Box {...props}>
      {NAVDATA.map((el, idx) => (
        <SidebarNavItem item={el} key={idx} />
      ))}
    </Box>
  );
};
