import { Box, Stack, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UITabsProps } from './types';
import { UITabPanel } from './ui/ui-tab-panel';

const UITabs: React.FC<UITabsProps> = ({
  tabs,
  defaultValue = 0,
  changeActiveTabHandle,
  children,
  endAdornment,
  sx,
  value = defaultValue,
  onChange,
  TabPanelSx,
}) => {
  const [myValue, setMyValue] = useState(defaultValue);

  useEffect(() => {
    setMyValue(value);
  }, [value])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMyValue(newValue);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs value={myValue} onChange={onChange || handleChange} aria-label='ui-tabs'>
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              label={tab.label}
              disableRipple
              onClick={() => changeActiveTabHandle?.(idx)}
            />
          ))}
        </Tabs>
        {!!endAdornment && <Box mr={3}>{endAdornment}</Box>}
        {children}
      </Stack>
      {tabs.map((tab, idx) => (
        <UITabPanel value={myValue} index={idx} key={idx} sx={TabPanelSx}>
          {tab.component}
        </UITabPanel>
      ))}
    </Box>
  );
};

export default UITabs;
