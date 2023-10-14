import { BaseLayout } from '@/shared/ui';
import { Box } from '@mui/material';
import { RegistrationStepper } from '@/features/registration-stepper';
import { RegistrationHeader } from '@/widgets/registration-header';
import { RegistrationContextProvider } from '@/app/providers/registration-context-provider';

export const RegistrationPage = () => {
  return (
    <BaseLayout customHeader={<RegistrationHeader />}>
      <RegistrationContextProvider>
        <Box
          sx={{
            m: '40px auto',
            maxWidth: '480px',
          }}
        >
          <RegistrationStepper />
        </Box>
      </RegistrationContextProvider>
    </BaseLayout>
  );
};
