import { FC, PropsWithChildren, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormLabel,
  Stack,
  StackProps,
  Step,
  StepLabel,
  Typography,
} from '@mui/material';
import { FormTextInput } from '@/shared/inputs';
import { StepperStyled } from './ui/stepper-styled';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Colors } from '@/app/constants';
import { useTranslation } from 'react-i18next';
import notify from '@/app/providers/toaster/lib/notify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUserRegistrationMutation } from '@/entities/auth/api';

interface IRegistrationForm {
  email: string;
  firstName: string;
  lastName: string;
  className?: string;
  password: string;
  confirmPassword: string;
}

const StackComponent: FC<PropsWithChildren<StackProps>> = ({ children }) => {
  return <Stack direction='column'>{children}</Stack>;
};

export const RegistrationStepper = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('registration');
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<IRegistrationForm>();
  const password = watch('password') ?? '';
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\u0400-\u04FF]{5,}$/;

  const [userRegistration] = useUserRegistrationMutation();

  useEffect(() => {
    navigate(`/registration/${type}`);
  }, [type]);

  const steps = [
    t('registration:steps.email'),
    t('registration:steps.fullName'),
    t('registration:steps.password'),
  ];

  const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
    console.log(data);
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      className: data.className,
    };
    await userRegistration({ ...body });

    notify(t('registration_success'), 'success');
    navigate(`/cabinet`);
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);

    let canContinue = true;

    switch (activeStep) {
      case 0:
        canContinue = true;
        break;
      case 1:
        canContinue = true;
        break;
      case 2:
        canContinue = false;
        break;
    }

    if (canContinue) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 2) {
      setCompleted({
        ...completed,
        [activeStep]: false,
        [activeStep - 1]: false,
      });
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else if (activeStep > 0) {
      setCompleted({
        ...completed,
        [activeStep - 1]: false,
      });
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <Stack direction='column' justifyContent='center'>
      <StepperStyled activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} active={activeStep === index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </StepperStyled>

      <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Stack direction='column' spacing={4}>
          {activeStep == 0 && (
            <>
              <Typography fontWeight={600} fontSize='20px'>
                {t('type_email')}
              </Typography>

              <StackComponent>
                <FormLabel required>{t('steps.email')}</FormLabel>
                <FormTextInput
                  name='email'
                  control={control}
                  rules={{
                    required: true,
                    validate: (value?: string) =>
                      value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        ? true
                        : t('email_format_error'),
                  }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </StackComponent>

              <Stack direction='row' justifyContent='space-between'>
                <Box component={Link} to={`/login/${type}`}>
                  <Typography>{t('go_and_login')}</Typography>
                </Box>
                <Button onClick={handleNext} sx={{ width: 150 }}>
                  {t('next')}
                </Button>
              </Stack>
            </>
          )}

          {activeStep == 1 && (
            <>
              <Typography fontWeight={600} fontSize='20px'>
                {t('type_name_surname')}
              </Typography>

              <StackComponent>
                <FormLabel required>{t('first_name')}</FormLabel>
                <FormTextInput
                  name='firstName'
                  control={control}
                  rules={{
                    required: true,
                    validate: (value?: string) =>
                      value && /^[A-Za-zА-Яа-я]+$/.test(value) ? true : t('name_error'),
                  }}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </StackComponent>

              <StackComponent>
                <FormLabel required>{t('last_name')}</FormLabel>
                <FormTextInput
                  name='lastName'
                  control={control}
                  rules={{
                    required: true,
                    validate: (value?: string) =>
                      value && /^[A-Za-zА-Яа-я]+$/.test(value) ? true : t('name_error'),
                  }}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </StackComponent>

              <StackComponent>
                <FormLabel required>{t('class_number')}</FormLabel>
                <FormTextInput
                  name='className'
                  control={control}
                  rules={{
                    required: true,
                    validate: (value?: string) =>
                      value && /^[A-Za-zА-Яа-я0-9]+$/.test(value) ? true : t('class_error'),
                  }}
                  error={!!errors.className}
                  helperText={errors.className?.message}
                />
              </StackComponent>

              <Stack direction='row' justifyContent='space-between' spacing={2}>
                <Button
                  onClick={handleBack}
                  sx={{
                    width: 150,
                    backgroundColor: Colors.MEDIUM_GREY,
                    ':hover': { backgroundColor: Colors.MEDIUM_GREY },
                  }}
                >
                  {t('back')}
                </Button>
                <Button onClick={handleNext} sx={{ width: 150 }}>
                  {t('next')}
                </Button>
              </Stack>
            </>
          )}

          {activeStep == 2 && (
            <>
              <Typography fontWeight={600} fontSize='20px'>
                {t('type_password')}
              </Typography>

              <Typography color={Colors.DARK}>{t('password_description')}</Typography>

              <StackComponent>
                <FormLabel required>{t('type_password')}</FormLabel>
                <FormTextInput
                  type='password'
                  name='password'
                  control={control}
                  rules={{
                    required: true,
                    validate: (value?: string) => {
                      if (!!!value?.length) {
                        return t('please_fill_in');
                      } else if (!regExp.test(value)) {
                        return t('should_match');
                      } else return true;
                    },
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </StackComponent>

              <StackComponent>
                <FormLabel required>{t('type_confirmation_password')}</FormLabel>
                <FormTextInput
                  type='password'
                  name='confirmPassword'
                  control={control}
                  rules={{
                    required: true,
                    validate: (confirmedPassword?: string) => {
                      if (!!!confirmedPassword?.length) {
                        return t('please_fill_in');
                      } else if (!regExp.test(confirmedPassword)) {
                        return t('should_match');
                      } else if (password !== confirmedPassword) {
                        return t('check_password');
                      } else return true;
                    },
                  }}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </StackComponent>

              <Stack direction='row' justifyContent='space-between' spacing={2}>
                <Button
                  onClick={handleBack}
                  sx={{
                    width: 150,
                    backgroundColor: Colors.MEDIUM_GREY,
                    ':hover': { backgroundColor: Colors.MEDIUM_GREY },
                  }}
                >
                  {t('back')}
                </Button>
                <Button type='submit' sx={{ width: 150 }}>
                  {t('confirm')}
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};
