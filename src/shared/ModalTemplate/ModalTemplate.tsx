import { Box, Button, ButtonBase, Stack, Typography, TypographyProps } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as XmarkIcon } from '@/app/assets/icons/xmark.svg';
import { Colors } from '@/app/constants';

interface Props {
  loading?: boolean;
  title?: string;
  submitBtnText?: string;
  cancelBtnText?: string;
  submitBtnColor?: 'primary' | 'error';
  onSubmit?: React.FormEventHandler<HTMLDivElement>;
  onClose?: () => void;
  customCancelFunction?: () => void;
  children?: React.ReactNode;
  TitleProps?: TypographyProps;
  disabled?: boolean;
  noBtns?: boolean;
}

const ModalTemplate: React.FC<Props> = ({
  loading,
  title,
  onSubmit,
  onClose,
  submitBtnText,
  cancelBtnText,
  children,
  submitBtnColor,
  TitleProps,
  disabled,
  noBtns = false,
  customCancelFunction,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        p: 4.5,
      }}
      {...(onSubmit && {
        component: 'form',
        onSubmit,
      })}
    >
      <Stack direction='row-reverse' alignItems='center' justifyContent='space-between'>
        {onClose && (
          <ButtonBase
            onClick={onClose}
            sx={{
              height: '40px',
              width: '40px',
              borderRadius: '8px',
              backgroundColor: Colors.LIGHT_BLUE,
            }}
          >
            <XmarkIcon />
          </ButtonBase>
        )}
        <Typography
          variant='h3'
          sx={{
            lineHeight: 1,
          }}
          {...TitleProps}
        >
          {title}
        </Typography>
      </Stack>
      <Box
        sx={{
          my: 5,
        }}
      >
        {children}
      </Box>
      {!noBtns && (
        <Stack direction='row' justifyContent='flex-end' spacing={2.5}>
          {onClose && (
            <Button
              onClick={customCancelFunction ? customCancelFunction : onClose}
              color='secondary'
              disabled={loading}
            >
              {cancelBtnText || t('cancel')}
            </Button>
          )}
          <Button type='submit' disabled={loading || disabled} color={submitBtnColor}>
            {submitBtnText || t('save')}
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default ModalTemplate;
