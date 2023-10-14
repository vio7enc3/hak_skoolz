import { RequireAtLeastOne } from '@/app/helpers/types';
import { PaginationProps, SxProps } from '@mui/material';
import { FieldPath, FieldValues } from 'react-hook-form';

type UITableColumn<T extends FieldValues> = RequireAtLeastOne<
  {
    key: FieldPath<T>;
    render: (row: T, index: number) => React.ReactNode;
    nowrap?: boolean;
    sx?: SxProps;
    align?: 'left' | 'right' | 'center';
  },
  'key' | 'render'
>;

type UITableHeader = {
  label: string;
  align?: 'left' | 'right' | 'center';
};

export interface UITableProps<T extends object> {
  data: T[];
  columns: UITableColumn<T>[];
  headers?: (UITableHeader | string | undefined)[];
  sx?: SxProps;
  PaginationProps?: PaginationProps;
  isLoading?: boolean;
  isError?: boolean;
  renderRowAfter?: (row: T, index: number) => React.ReactNode;
}
