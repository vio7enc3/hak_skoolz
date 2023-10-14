import { Box, Button, ButtonBase, Dialog, Stack, TextField, Typography } from '@mui/material';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { SmsConfirmModalProps, SmsConfirmModalRef } from './types';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/app/constants';
import dayjs from 'dayjs';
import { patternFormatter } from 'react-number-format';

const SmsConfirmModal = forwardRef<SmsConfirmModalRef, SmsConfirmModalProps>(
  ({ onConfirm, resendCode }, ref) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState('');
    const [time, setTime] = useState(120);
    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [code, setCode] = useState('');

    useEffect(() => {
      if (!open) return;
      const timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      if (time === 0) {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    }, [time, open]);

    useImperativeHandle(
      ref,
      () => ({
        init,
        close: handleClose,
      }),
      []
    );

    const init = (_phone: string) => {
      setPhone(_phone);
      setTime(120);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setPhone('');
      setCode('');
    };

    const onResetHandler = async () => {
      if (loading) return;
      try {
        setLoading(true);
        await resendCode();
        setTime(120);
      } finally {
        setLoading(false);
      }
    };

    const onChangeCodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      const reg = new RegExp('^[0-9]{0,6}$');

      if (reg.test(value)) {
        setCode(value);
      }
    };

    const onConfirmHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault();
      if (confirmLoading) return;
      try {
        setConfirmLoading(true);
        await onConfirm(code);
        handleClose();
      } finally {
        setConfirmLoading(false);
      }
    };

    return (
      <Dialog
        open={open}
        PaperProps={{
          sx: {
            p: 4,
            borderRadius: '12px',
          },
        }}
      >
        <Box component='form' onSubmit={onConfirmHandler}>
          <Box textAlign='center'>
            <Typography variant='h2'>{t('sms_confirm_modal_title')}</Typography>
            <Typography
              variant='subtitle1'
              sx={{
                color: Colors.TEXT_SECONDARY,
                maxWidth: '350px',
                lineHeight: '1.2',
                mt: 1,
              }}
            >
              {t('sms_confirm_modal_text')}: +
              {patternFormatter(phone, {
                format: '### (##) ###-##-##',
              })}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <TextField placeholder='*****' fullWidth value={code} onChange={onChangeCodeHandler} />
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{
                fontWeight: 500,
                mt: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: '#999999',
                }}
              >
                {t('sms_time_remind')}: {dayjs(time * 1000).format('mm:ss')}
              </Typography>
              {time === 0 && (
                <Box component={ButtonBase} disableRipple onClick={onResetHandler}>
                  <Typography
                    color='red'
                    sx={{
                      fontSize: '0.875rem',
                    }}
                  >
                    {t('sms_confirm_modal_resend')}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
          <Button
            fullWidth
            disabled={code.length !== 6 || confirmLoading}
            type='submit'
            sx={{
              mt: 3,
            }}
          >
            {t('confirm')}
          </Button>
        </Box>
      </Dialog>
    );
  }
);

export default SmsConfirmModal;
