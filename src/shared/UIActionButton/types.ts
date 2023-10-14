import { RequireAtLeastOne } from '@/app/helpers/types';
import { ButtonBaseProps } from '@mui/material';

type Icon =
  | 'cancel'
  | 'edit'
  | 'delete'
  | 'search'
  | 'add'
  | 'check'
  | 'prolong'
  | 'upload'
  | 'download'
  | 'document'
  | 'writing'
  | 'document-delete'
  | 'inspect'
  | 'share'
  | 'excel'
  | 'refresh';
type Color = 'yellow' | 'light-blue' | 'default';

export type UIActionButtonProps = ButtonBaseProps &
  RequireAtLeastOne<
    {
      icon: Icon;
      text: string;
      tooltip?: string;
      color?: Color;
      noShadow?: boolean;
    },
    'icon' | 'text'
  >;
