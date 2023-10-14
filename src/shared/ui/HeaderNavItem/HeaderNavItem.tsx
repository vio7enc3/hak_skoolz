import { Colors } from '@/app/constants';
import { HeaderNavData } from '@/widgets/header/lib/types';
import { Box, ButtonBase, MenuItem, MenuList, Typography } from '@mui/material';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { Link } from 'react-router-dom';

interface Props {
  item: HeaderNavData;
}

export const HeaderNavItem: React.FC<Props> = ({ item }) => {
  const [referenceEl, setReferenceEl] = useState<null | HTMLElement>(null);
  const [popperEl, setPopperEl] = useState<null | HTMLElement>(null);

  const [popperOpen, setPopperOpen] = useState(false);

  const { styles, attributes } = usePopper(referenceEl, popperEl, {
    placement: 'bottom',
  });

  return (
    <Box
      component='li'
      ref={setReferenceEl}
      onMouseEnter={() => setPopperOpen(true)}
      onMouseLeave={() => setPopperOpen(false)}
    >
      <ButtonBase
        disableRipple
        aria-controls={popperOpen ? 'menu' : undefined}
        aria-haspopup='true'
        aria-expanded={popperOpen ? 'true' : undefined}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          {item.label}
        </Typography>
      </ButtonBase>
      {!!item.menu && popperOpen && (
        <Box
          component='div'
          style={styles.popper}
          {...attributes}
          ref={setPopperEl}
          sx={{
            backgroundColor: '#fff',
            zIndex: 2,
            borderRadius: '8px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <MenuList>
            {item.menu.map((menuItem, idx) => (
              <Box
                component={Link}
                to={menuItem.href}
                key={idx}
                sx={{
                  textDecoration: 'none',
                  color: Colors.TEXT_DARK,
                }}
              >
                <MenuItem>{menuItem.label}</MenuItem>
              </Box>
            ))}
          </MenuList>
        </Box>
      )}
      {/* <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {item.menu.map((menuItem, idx) => (
          <Link to={menuItem.href} key={idx}>
            <MenuItem>{menuItem.label}</MenuItem>
          </Link>
        ))}
      </Menu> */}
    </Box>
  );
};
