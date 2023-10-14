import { Dialog, Typography } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ConfirmModalInitArgs, ConfirmModalRef } from './types';
import { useTranslation } from 'react-i18next';
import ModalTemplate from '../ModalTemplate/ModalTemplate';

const ConfirmModal = forwardRef<ConfirmModalRef>((_props, ref) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [btnColor, setBtnColor] = useState<ConfirmModalInitArgs['btnColor']>();
  const [btnText, setBtnText] = useState<string>();
  const [text, setText] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [loading, setLoading] = useState(false);

  const resolveCallback = useRef<() => void>();
  const rejectCallback = useRef<() => void>();

  useImperativeHandle(
    ref,
    () => ({
      init,
      close: handleClose,
      setLoading,
    }),
    []
  );

  const init: ConfirmModalRef['init'] = ({ btnColor, btnText, title, text }) => {
    return new Promise((resolve, reject) => {
      rejectCallback.current = reject;
      resolveCallback.current = resolve;

      setBtnColor(btnColor ?? 'primary');
      setBtnText(btnText ?? t('confirm'));
      setTitle(title ?? t('confirm_action'));
      setText(text ?? t('confirm_action_text'));
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setText('');
      setTitle('');
      setBtnText('');
      setBtnColor(undefined);
    }, 500);
    // rejectCallback.current?.();
  };

  const handleCloseAndReject = () => {
    handleClose();
    rejectCallback.current?.();
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '500px',
        },
      }}
    >
      <ModalTemplate
        onClose={handleCloseAndReject}
        loading={loading}
        title={title ?? t('confirm_action')}
        submitBtnColor={btnColor}
        submitBtnText={btnText ?? t('confirm')}
        onSubmit={(event) => {
          event.preventDefault();
          resolveCallback.current?.();
        }}
        TitleProps={{
          fontSize: '1.5rem',
        }}
      >
        <Typography>{text ?? t('confirm_action_text')}</Typography>
      </ModalTemplate>
    </Dialog>
  );
});

export default ConfirmModal;
