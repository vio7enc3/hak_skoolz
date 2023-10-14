import { RegistrationContext } from '@/app/providers/registration-context-provider';
import PasswordInput from '@/shared/inputs/PasswordInput/PasswordInput';
import { Button, FormControl, FormLabel, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  handleNext: () => Promise<void>;
}

const RegistrationCreatePassword: React.FC<Props> = ({ handleNext }) => {
  const { t } = useTranslation('registration');
  const { form, checkResult } = useContext(RegistrationContext);
  const [loading, setLoading] = useState(false);

  if (!form) return;

  const { control, watch, trigger } = form;

  const password = watch('password');

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!checkResult) return;
    const triggerResult = await Promise.all([trigger('password'), trigger('passwordConfirm')]);

    if (triggerResult.some((res) => !res)) return;

    try {
      setLoading(true);
      await handleNext();
    } finally {
      setLoading(false);
    }
  };

  // if (!checkResult?.newUser) {
  //   return (
  //     <Box>

  //     </Box>
  //   )
  // }

  return (
    <Stack spacing={2} component='form' onSubmit={onSubmitHandler}>
      <FormControl>
        <FormLabel>{t('create_password')}:</FormLabel>
        <Controller
          control={control}
          name='password'
          rules={{
            required: t('errors:required_field'),
          }}
          render={({ field, fieldState }) => (
            <>
              <PasswordInput
                {...field}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            </>
          )}
        />
      </FormControl>

      <FormControl>
        <FormLabel>{t('common:password_repeat')}:</FormLabel>
        <Controller
          control={control}
          name='passwordConfirm'
          rules={{
            required: t('errors:required_field'),
            validate: (val: string) => {
              if (val !== password && val.length >= password.length)
                return t('passwords_not_match');

              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <PasswordInput
                {...field}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            </>
          )}
        />
      </FormControl>

      <Button type='submit' disabled={loading}>
        {t('common:next')}
      </Button>
    </Stack>
  );
};

export default RegistrationCreatePassword;
