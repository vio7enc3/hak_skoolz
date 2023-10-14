import React from 'react';
import { SubNavItem } from '../lib/types';
import { Box, Stack, Typography } from '@mui/material';
import { ReactComponent as RightChevronIcon } from '@/app/assets/icons/chevron-right.svg';
import { Link, useLocation } from 'react-router-dom';
import { Colors } from '@/app/constants';

interface Props {
  data: SubNavItem[];
}

export const SidebarNavPopper: React.FC<Props> = ({ data }) => {
  const { pathname } = useLocation();

  return (
    <Box>
      {data.map((el, idx) => {
        const isActive = pathname === el.to;
        return (
          <Box
            key={idx}
            sx={{
              backgroundColor: Colors.DARK,
              '& :hover': {
                backgroundColor: '#51336B',
              },
            }}
          >
            <Stack
              spacing={1.25}
              direction='row'
              alignItems='center'
              component={Link}
              to={el.to}
              sx={{
                textDecoration: 'none',
                padding: '8px 70px 8px 16px',
                minWidth: 'max-content',
              }}
            >
              <Box component={RightChevronIcon} />
              <Typography
                sx={{
                  color: isActive ? Colors.TEXT_WHITE : '#8E6EAC',
                  fontWeight: 500,
                }}
              >
                {el.label}
              </Typography>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};
