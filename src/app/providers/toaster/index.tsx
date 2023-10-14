import { ToastContainer, TypeOptions } from 'react-toastify';
import { ReactComponent as TostErrorIcon } from '@/app/assets/icons/toast_error.svg';
import { ReactComponent as TostSuccessIcon } from '@/app/assets/icons/toast_success.svg';
import { ReactComponent as TostWarningIcon } from '@/app/assets/icons/toast_warning.svg';

export const Toaster = () => {
  const getToastIcon = (type: TypeOptions) => {
    switch (type) {
      case 'error':
        return <TostErrorIcon />;
      case 'warning':
        return <TostWarningIcon />;
      case 'success':
      default:
        return <TostSuccessIcon />;
    }
  };

  return (
    <ToastContainer
      autoClose={3000}
      position='top-right'
      icon={({ type }) => getToastIcon(type)}
      closeButton={false}
    />
  );
};
