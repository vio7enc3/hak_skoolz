import { ReactNode } from 'react';
import { IQuarter } from '@/app/constants/quarters';
import { SxProps } from '@mui/material';

export interface TabItem {
  component: ReactNode;
  label: string;
}

export interface UITabsProps {
  tabs: TabItem[];
  defaultValue?: number;
  changeActiveTabHandle?: (value: number) => void;
  children?: ReactNode;
  sx?: SxProps;
  endAdornment?: ReactNode;
  value?: number;
  onChange?: ((event: React.SyntheticEvent<Element, Event>, value: any) => void) | undefined;
  TabPanelSx?: SxProps;
}
