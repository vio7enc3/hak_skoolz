import { RequireAtLeastOne } from '@/app/helpers/types';
import { SxProps, TableContainerProps } from '@mui/material';
import { FieldPath, FieldValues } from 'react-hook-form';

type UITableColumn<T extends FieldValues> = RequireAtLeastOne<
  {
    key: FieldPath<T>;
    render: (row: T) => React.ReactNode;
    nowrap?: boolean;
    colSpan?: number;
    rowSpan?: number;
    sx?: SxProps;
  },
  'key' | 'render'
>;

export interface UIDetailsTableProps<T extends object> {
  data: T;
  rows: UITableColumn<T>[][];
  headers?: {
    label: string;
    colSpan?: number;
    nowrap?: boolean;
  }[];
  sx?: TableContainerProps['sx'];
  cellSx?: SxProps;
}
