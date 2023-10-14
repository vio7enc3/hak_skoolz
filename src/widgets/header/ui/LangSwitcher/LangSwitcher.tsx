import React, { useState } from 'react';
import { ReactComponent as DownChevron } from '@/app/assets/icons/down-chevron.svg';
import {
  Box,
  ButtonBase,
  ButtonBaseProps,
  Menu,
  MenuItem,
  Stack,
  Typography,
  TypographyProps,
} from '@mui/material';
import { getLang } from '@/app/utils';
import { Colors } from '@/app/constants';
import i18next from 'i18next';

const langs = [
  {
    name: 'Рус',
    code: 'ru',
  },
  {
    name: 'Uz',
    code: 'uz',
  },
];

interface Props {
  variant?: 'outlined' | 'contained';
  component?: 'div' | 'button';
  ButtonBaseProps?: ButtonBaseProps;
  TypographyProps?: TypographyProps;
  hideChevron?: boolean;
  isMainPage?: boolean;
}

export const LangSwitcher: React.FC<Props> = ({
  variant,
  hideChevron,
  ButtonBaseProps,
  TypographyProps,
  component,
  isMainPage,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeLang = (code: string) => {
    localStorage.setItem('lang', code);
    handleClose();
    i18next.changeLanguage(code).catch((e) => console.log(e));
    // window.location.reload();
  };

  const lang = getLang();

  return (
    <Box>
      <Box
        component={component === 'div' ? 'div' : ButtonBase}
        aria-controls={open ? 'lang-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        id='lang-button'
        onClick={handleClick}
        {...(component === 'button'
          ? {
              disableRipple: true,
              ...ButtonBaseProps,
            }
          : {})}
        sx={{
          border: variant === 'outlined' ? `1px solid ${Colors.TEXT_SECONDARY}` : 'none',
          borderRadius: variant === 'outlined' ? '6px' : '0px',
          padding: '9px 15px',
          backgroundColor: isMainPage ? 'rgba(155, 181, 204, 0.2)' : '',
          ...ButtonBaseProps?.sx,
        }}
      >
        <Stack direction='row' alignItems='center' spacing={0.5}>
          <Typography
            {...TypographyProps}
            sx={{
              color: variant === 'outlined' ? Colors.TEXT_DARK : Colors.BLUE,
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: '1.3rem',
              ...TypographyProps?.sx,
            }}
          >
            {langs.find((l) => l.code === lang)?.name.toUpperCase()}
          </Typography>
          {!hideChevron && (
            <Box
              component={DownChevron}
              sx={{
                '& path': {
                  // fill: variant === 'outlined' ? Colors.TEXT_DARK : Colors.BLUE,
                  stroke: variant === 'outlined' ? Colors.TEXT_DARK : Colors.BLUE,
                },
              }}
            />
          )}
        </Stack>
      </Box>
      <Menu
        id='lang-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lang-button',
        }}
      >
        {langs.map((l) => (
          <MenuItem
            onClick={() => onChangeLang(l.code)}
            key={l.code}
            sx={{
              color: variant === 'outlined' ? Colors.TEXT_DARK : Colors.BLUE,
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: '1.3rem',
            }}
          >
            {l.name.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
