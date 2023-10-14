import { BaseModalRef } from '@/app/helpers/types';
import { Dialog } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import EcpLoginForm from '../ecp-login-form';
import LoginLayout from '@/widgets/login-layout';
import ModalTemplate from '@/shared/ModalTemplate/ModalTemplate';

interface Props {
  redirect?: string;
  onLogin?: () => void;
}

export const LoginModal = forwardRef<BaseModalRef, Props>(({ redirect, onLogin }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
      close: onClose,
    }),
    []
  );

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxWidth: '620px',
          width: '100%',
        },
      }}
    >
      <ModalTemplate onClose={onClose} noBtns>
        <LoginLayout>
          <EcpLoginForm jurRedirect={redirect} onLogin={onLogin} />
        </LoginLayout>
      </ModalTemplate>
    </Dialog>
  );
});
