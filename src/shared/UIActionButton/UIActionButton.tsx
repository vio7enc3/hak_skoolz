import React from 'react';
import { Box, ButtonBase, ButtonBaseProps, Tooltip, Typography } from '@mui/material';

import { ReactComponent as XmarkIcon } from '@/app/assets/icons/xmark.svg';
import { ReactComponent as EditIcon } from '@/app/assets/icons/edit.svg';
import { ReactComponent as TrashIcon } from '@/app/assets/icons/trash.svg';
import { ReactComponent as SearchIcon } from '@/app/assets/icons/search.svg';
import { ReactComponent as PlusIcon } from '@/app/assets/icons/plus.svg';
import { ReactComponent as CheckedIcon } from '@/app/assets/icons/checked.svg';
import { ReactComponent as ProlongIcon } from '@/app/assets/icons/prolong.svg';
import { ReactComponent as DocumentsCaseIcon } from '@/app/assets/icons/documents-case.svg';
import { ReactComponent as WritingIcon } from '@/app/assets/icons/writing.svg';
import { ReactComponent as DeleteDocumentIcon } from '@/app/assets/icons/delete_document.svg';
import { ReactComponent as UploadIcon } from '@/app/assets/icons/upload.svg';
import { ReactComponent as DownloadIcon } from '@/app/assets/icons/download.svg';
import { ReactComponent as ShareIcon } from '@/app/assets/icons/share.svg';
import { ReactComponent as EyeIcon } from '@/app/assets/icons/eye.svg';
import { ReactComponent as RefreshIcon } from '@/app/assets/icons/refresh.svg';
import { ReactComponent as ExcelIcon } from '@/app/assets/icons/excel_icon.svg';

import { UIActionButtonProps } from './types';
import { Colors } from '@/app/constants';

const ButtonComp: React.FC<
  ButtonBaseProps & {
    btnColor: UIActionButtonProps['color'];
    noShadow: UIActionButtonProps['noShadow'];
  }
> = ({ btnColor, noShadow, ...rest }) => {
  const chooseBtnColor = () => {
    switch (btnColor) {
      case 'yellow':
        return Colors.PRIMARY;
      case 'light-blue':
        return Colors.LIGHT_BLUE;
      default:
        return Colors.TEXT_WHITE;
    }
  };

  return (
    <ButtonBase
      {...rest}
      sx={{
        height: '40px',
        minWidth: '40px',
        borderRadius: '8px',
        backgroundColor: chooseBtnColor(),
        boxShadow: noShadow ? 'none' : '0px 4px 4px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.2s ease-in-out',
        ...(btnColor !== 'default' && {
          '& path': {
            stroke: Colors.TEXT_DARK,
          },
        }),
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    />
  );
};

const UIActionButton: React.FC<UIActionButtonProps> = ({
  icon,
  tooltip,
  color = 'default',
  noShadow,
  text,
  ...rest
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'add':
        return PlusIcon;
      case 'edit':
        return EditIcon;
      case 'delete':
        return TrashIcon;
      case 'search':
        return SearchIcon;
      case 'check':
        return CheckedIcon;
      case 'prolong':
        return ProlongIcon;
      case 'document':
        return DocumentsCaseIcon;
      case 'writing':
        return WritingIcon;
      case 'document-delete':
        return DeleteDocumentIcon;
      case 'upload':
        return UploadIcon;
      case 'download':
        return DownloadIcon;
      case 'share':
        return ShareIcon;
      case 'inspect':
        return EyeIcon;
      case 'refresh':
        return RefreshIcon;
      case 'excel':
        return ExcelIcon;
      case 'cancel':
      default:
        return XmarkIcon;
    }
  };

  return (
    <Tooltip title={tooltip}>
      <Box>
        <ButtonComp {...rest} btnColor={color} noShadow={noShadow}>
          {icon ? (
            <Box
              component={getIcon()}
              sx={{
                // width: '100%',
                height: '20px',
              }}
            />
          ) : (
            <Typography
              sx={{
                color: Colors.TEXT_SECONDARY,
                fontWeight: 500,
                px: 1.5,
              }}
            >
              {text}
            </Typography>
          )}
        </ButtonComp>
      </Box>
    </Tooltip>
  );
};

export default UIActionButton;
