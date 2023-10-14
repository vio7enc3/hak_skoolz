import { RegistrationHeader } from '@/widgets/registration-header';
import { BaseLayout } from '@/shared/ui';
import LoginLayout from '@/widgets/login-layout';
import { Box, Button, FormLabel, Stack, StackProps, Typography } from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/shared/inputs';
import { useTranslation } from 'react-i18next';
import { FC, PropsWithChildren } from 'react';
import { Colors } from '@/app/constants';
import { useAuthWithPasswordMutation } from '@/entities/auth/api';
import { useAppDispatch } from '@/app/hooks';
import { login } from '@/entities/session';
import { handleResponse } from '@/app/utils';

type LoginType = 'ecp' | 'password';

interface ILoginForm {
  email: string;
  password: string;
}

const StackComponent: FC<PropsWithChildren<StackProps>> = ({ children }) => {
  return <Stack direction='column'>{children}</Stack>;
};

export const LoginPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const { t } = useTranslation('login');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\u0400-\u04FF]{5,}$/;

  const [userLogin] = useAuthWithPasswordMutation();

  const params = new URLSearchParams(search);
  const loginType = (params.get('type') as LoginType) || 'ecp';

  const onSubmit = async (data: ILoginForm) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    const res = await handleResponse(await userLogin(body));

    dispatch(login({ ...res }));

    navigate('/cabinet');
  };

  return (
    <BaseLayout customHeader={<RegistrationHeader />}>
      <LoginLayout loginType={loginType}>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <Stack direction='column' spacing={3}>
            <StackComponent>
              <FormLabel required>{t('form.email')}</FormLabel>
              <FormTextInput
                name='email'
                control={control}
                rules={{
                  required: true,
                  validate: (value: string) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : t('email_format_error'),
                }}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </StackComponent>

            <StackComponent>
              <FormLabel required>{t('form.password')}</FormLabel>
              <FormTextInput
                type='password'
                name='password'
                control={control}
                rules={{
                  required: true,
                  validate: (value: string) => {
                    if (!!!value.length) {
                      return t('please_fill_in');
                    } else if (!regExp.test(value)) {
                      return t('should_match');
                    } else return true;
                  },
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button type='submit' sx={{ mt: 5 }}>
                {t('authorize')}
              </Button>
            </StackComponent>
            <Box component={Link} to={`/registration/${type}`} style={{ textAlign: 'center' }}>
              <Typography color={Colors.DARK} fontWeight={600}>
                {t('no_account')}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </LoginLayout>
    </BaseLayout>
  );
};
