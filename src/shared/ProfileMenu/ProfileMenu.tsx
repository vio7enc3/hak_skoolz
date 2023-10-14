import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as DownChevronIcon } from '@/app/assets/icons/down-chevron.svg';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('cabinet');
  const { company, user, userType } = useAppSelector((state) => state.session);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    // dispatch(logout());

    navigate('/login');
  };

  return (
    <>
      <Box
        sx={{
          cursor: 'pointer',
        }}
        component='div'
        onClick={handleOpen}
      >
        <Stack direction='row' alignItems='center'>
          <Box
            sx={{
              mr: 8,
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                maxWidth: '300px',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {userType === 'company' ? company?.name : user?.name}
            </Typography>
            {/* <Typography
              sx={{
                fontSize: '0.86rem',
                fontWeight: 500,
                color: Colors.TEXT_SECONDARY,
              }}
            >
              {userType === 'company' ? t('jur_person') : t('phis_person')}
            </Typography> */}
          </Box>
          <Box
            component={DownChevronIcon}
            sx={{
              '& path': {
                stroke: Colors.TEXT_SECONDARY,
              },
            }}
          />
        </Stack>
      </Box>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              width: '220px',
            },
          },
        }}
      >
        <MenuItem onClick={logoutHandler}>{t('logout')}</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
