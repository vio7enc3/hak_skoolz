import { Colors } from '@/app/constants';
import i18n from '@/app/i18n';
import { Box } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';
import { ToastOptions, TypeOptions, toast } from 'react-toastify';

const Container = (props: PropsWithChildren) => <Box>{props.children}</Box>;

const notify = (content: ReactNode, type: TypeOptions = 'error', options?: ToastOptions): void => {
  const t = i18n.t;

  const getColor = (): Colors => {
    switch (type) {
      case 'error':
        return Colors.ERROR;
      case 'warning':
        return Colors.WARNING;
      case 'success':
      default:
        return Colors.SUCCESS;
    }
  };
  toast(
    <Container>
      <Box
        sx={{
          height: '100%',
          color: getColor(),
        }}
      >
        <Box
          sx={{
            fontWeight: 700,
            fontSize: '1.2rem',
            lineHeight: 1,
            mb: 0.5,
          }}
        >
          {t('common:toast.' + String(type))}
        </Box>
        <Box
          sx={{
            fontWeight: 500,
          }}
        >
          {content}
        </Box>
      </Box>
    </Container>,
    {
      hideProgressBar: true,
      ...options,
      type,
    }
  );
};

export default notify;
