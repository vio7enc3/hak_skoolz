import { Colors } from '@/app/constants';
import { Box, BoxProps, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as WalletIcon } from '@/app/assets/icons/wallet.svg';
import { ReactComponent as EyeIcon } from '@/app/assets/icons/eye.svg';
import { ReactComponent as EyeSlachIcon } from '@/app/assets/icons/eye-slash.svg';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setShowBalance } from '@/entities/app';
import { numericFormatter } from 'react-number-format';

export const SidebarBanalce: React.FC<BoxProps> = (props) => {
  const { showBalance } = useAppSelector((state) => state.app);
  const { balance } = useAppSelector((state) => state.session);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <Box
      {...props}
      sx={{
        backgroundColor: Colors.DARK,
        p: 2,
      }}
    >
      <Grid container spacing={1.25}>
        <Grid item>
          <WalletIcon />
        </Grid>
        <Grid item flex={1}>
          <Typography
            sx={{
              color: Colors.TEXT_WHITE,
              fontWeight: 600,
            }}
          >
            {t('balance')}
          </Typography>
          <Stack spacing={1.25} mt={1.5}>
            <Box>
              <Typography
                sx={{
                  color: '#8E6EAC',
                }}
              >
                {t('available')}:
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.21rem',
                  fontWeight: 600,
                  color: Colors.TEXT_WHITE,
                }}
              >
                {showBalance
                  ? numericFormatter(String(balance?.availableBalance), {
                      thousandSeparator: ' ',
                    })
                  : '******'}{' '}
                <Box
                  component='span'
                  sx={{
                    fontWeight: 400,
                  }}
                >
                  {t('uzs')}
                </Box>
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  color: '#8E6EAC',
                }}
              >
                {t('blocked')}:
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.21rem',
                  fontWeight: 600,
                  color: Colors.TEXT_WHITE,
                }}
              >
                {showBalance
                  ? numericFormatter(String(balance?.blockedBalance), {
                      thousandSeparator: ' ',
                    })
                  : '******'}{' '}
                <Box
                  component='span'
                  sx={{
                    fontWeight: 400,
                  }}
                >
                  {t('uzs')}
                </Box>
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item>
          <Box
            sx={{
              cursor: 'pointer',
              '& path': {
                stroke: '#fff',
              },
            }}
          >
            {showBalance ? (
              <Box component={EyeSlachIcon} onClick={() => dispatch(setShowBalance(false))} />
            ) : (
              <Box component={EyeIcon} onClick={() => dispatch(setShowBalance(true))} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
