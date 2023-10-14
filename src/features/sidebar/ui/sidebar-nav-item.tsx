import React, { useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Stack,
  StackProps,
  Typography,
  styled,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { usePopper } from 'react-popper';
import { SidebarNavPopper } from './sidebar-nav-popper';

import { ReactComponent as DownChevronIcon } from '@/app/assets/icons/down-chevron.svg';
import { ReactComponent as RightChevronIcon } from '@/app/assets/icons/chevron-right.svg';

import { NavItem } from '../lib/types';
import { Colors } from '@/app/constants';

interface Props {
  item: NavItem;
}

const AccordionContent = styled((props: StackProps) => (
  <Stack direction='row' spacing={2.5} alignItems='center' {...props} />
))(() => ({
  textDecoration: 'none',
})) as typeof Stack;

export const SidebarNavItem: React.FC<Props> = ({ item }) => {
  const { pathname } = useLocation();
  const { sidebarCollapsed, cabinetType } = useAppSelector((state) => state.app);
  const { userType } = useAppSelector((state) => state.session);
  const [referenceEl, setReferenceEl] = useState<null | HTMLElement>(null);
  // const [popperEl, setPopperEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);

  // const [popperOpen, setPopperOpen] = useState(false);

  // const { styles, attributes } = usePopper(referenceEl, popperEl, {
  //   placement: 'right-start',
  // });

  const isActive =
    'items' in item ? item.items.some((el) => el.to === pathname) : pathname === item.to;
  const Icon = item.icon;

  const AccordionCustom = useMemo(
    () =>
      styled((props: AccordionProps) => (
        <Accordion disableGutters elevation={0} square {...props} />
      ))(() => ({
        '&:before': {
          display: 'none',
        },
        backgroundColor: isActive ? Colors.LIGHT_TURQUOISE : 'inherit',
        '& :hover': {
          // backgroundColor: '#51336B',
        },
      })),
    [isActive]
  );

  useEffect(() => {
    if (sidebarCollapsed) return setExpanded(false);

    if (isActive && !expanded) {
      setExpanded(true);
    }
  }, [isActive, sidebarCollapsed]);

  // if (!userType) return null;

  return (
    <>
      <AccordionCustom
        elevation={0}
        expanded={expanded}
        onChange={(_event, exp) => setExpanded(exp)}
      >
        <AccordionSummary
          expandIcon={
            'items' in item && !sidebarCollapsed && item.items.length ? <DownChevronIcon /> : <></>
          }
          sx={{
            mt: 0,
            padding: '12px 16px',
            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
          }}
          ref={setReferenceEl}
          {...('items' in item
            ? {
                component: 'div',
              }
            : {
                component: Link,
                to: item.to,
              })}
          // onMouseEnter={() => setPopperOpen(true)}
          // onMouseLeave={() => setPopperOpen(false)}
        >
          {/* {'items' in item ? ( */}
          <AccordionContent>
            <Box component='img' src={Icon} />
            {!sidebarCollapsed && (
              <Typography
                sx={{
                  fontWeight: 600,
                  color: Colors.DARK,
                  lineHeight: 1,
                }}
              >
                {item.label}
              </Typography>
            )}
          </AccordionContent>
          {/* ) : (
            <AccordionContent>
              <Box component={Icon} />
              {!sidebarCollapsed && (
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: Colors.DARK,
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </Typography>
              )}
            </AccordionContent>
          )} */}

          {/* {sidebarCollapsed && 'items' in item && popperOpen && (
            <Box component='div' ref={setPopperEl} style={styles.popper} {...attributes.popper}>
              <SidebarNavPopper
                data={item.items.filter(
                  (el) => !el.condition || el.condition({ cabinetType, userType })
                )}
              />
            </Box>
          )} */}
        </AccordionSummary>
        {'items' in item && !sidebarCollapsed && (
          <AccordionDetails
            sx={{
              padding: '8px 16px',
              '& :hover': {
                backgroundColor: 'inherit',
              },
            }}
          >
            <Stack spacing={1.5}>
              {item.items.map((el, idx) => {
                const isSubItemActive = pathname === el.to;

                // if (el.condition && !el.condition({ cabinetType, userType })) return null;

                return (
                  <Stack
                    key={idx}
                    spacing={1.25}
                    direction='row'
                    alignItems='center'
                    component={Link}
                    to={el.to}
                    sx={{
                      textDecoration: 'none',
                    }}
                  >
                    <Box component={RightChevronIcon} />
                    <Typography
                      sx={{
                        color: isSubItemActive ? Colors.TEXT_WHITE : '#8E6EAC',
                        fontWeight: 500,
                      }}
                    >
                      {el.label}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </AccordionDetails>
        )}
      </AccordionCustom>
    </>
  );
};
