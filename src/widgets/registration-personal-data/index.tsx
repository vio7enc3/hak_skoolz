import React, { useContext, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useAppDispatch } from '@/app/hooks';
import { RegistrationContext } from '@/app/providers/registration-context-provider';
import { handleResponse } from '@/app/utils';
import { authApi } from '@/entities/auth';
import { eimzo } from '@/entities/eimzo';
import { login } from '@/entities/session';

import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const RegistrationPersonalData: React.FC = () => {
  const { t } = useTranslation('registration');
  const navigate = useNavigate();
  const { form } = useContext(RegistrationContext);
  const [loading, setLoading] = useState(false);

  const [registerUser] = authApi.useCheckIsUserRegisteredMutation();

  const dispatch = useAppDispatch();

  if (!form) return;

  const { control, getValues } = form;

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const { ecp } = getValues();

    if (!ecp) return;

    try {
      setLoading(true);
      const signature = await eimzo.sign('qwe', ecp);
      const res = await handleResponse(
        await registerUser({
          signature,
        })
      );
      dispatch(login(res.data));
      navigate('/cabinet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2} component='form' onSubmit={onSubmitHandler}>
      <Button type='submit' disabled={loading}>
        {t('common:to_register')}
      </Button>
      <Typography
        variant='body2'
        sx={{
          textAlign: 'center',
          mt: 3,
          fontWeight: 500,
        }}
      >
        {t('common:have_account')}{' '}
        <Box
          component={Link}
          to='/login'
          sx={{
            display: 'inline',
          }}
        >
          {t('common:login_in_account')}
        </Box>
      </Typography>
    </Stack>
  );
};

export default RegistrationPersonalData;
