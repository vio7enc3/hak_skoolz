import { mainApi } from '@/app/api';
import { useAppDispatch } from '@/app/hooks';
import { handleResponse } from '@/app/utils';
import { authApi } from '@/entities/auth';
import { eimzo } from '@/entities/eimzo';
import { Cert } from '@/entities/eimzo/model/types';
import { login } from '@/entities/session';
import { setBalance } from '@/entities/session/model/slice';
import EcpSelect from '@/shared/EcpSelect/EcpSelect';
import { Box, Button, FormControl, FormHelperText, FormLabel, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
  ecpKey: Cert;
}

interface Props {
  jurRedirect?: string;
  onLogin?: () => void;
}

const EcpLoginForm: React.FC<Props> = ({ jurRedirect = '/cabinet', onLogin }) => {
  const { t } = useTranslation('login');
  const { control, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [authWithEcp] = authApi.useAuthWithEcpMutation();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const signature = await eimzo.sign('hello world', data.ecpKey);
      const res = await handleResponse(
        await authWithEcp({
          signature,
        })
      );

      onLogin?.();

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL as string}/exec?action=getBalance`,
        { unique: res.data.legalEntity?.unique },
        {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
        }
      );

      dispatch(login(res.data));
      dispatch(setBalance(response.data));

      if (res.data?.legalEntity) {
        navigate(jurRedirect);
      } else {
        navigate('/cabinet/individual');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth>
        <FormLabel>{t('common:ecp_key')}:</FormLabel>
        <Controller
          control={control}
          name='ecpKey'
          rules={{
            required: t('errors:required_field'),
          }}
          render={({ field, fieldState }) => (
            <EcpSelect
              {...field}
              invalid={fieldState.invalid}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <FormHelperText>{t('common:ecp_key_helper')}</FormHelperText>
      </FormControl>

      <Button fullWidth sx={{ mt: 5 }} type='submit' disabled={loading}>
        {t('common:login_in_account')}
      </Button>
      <Typography
        variant='body2'
        sx={{
          textAlign: 'center',
          mt: 3,
          fontWeight: 500,
        }}
      >
        {t('common:have_not_account')}{' '}
        <Box
          component={Link}
          to='/registration'
          sx={{
            display: 'inline',
          }}
        >
          {t('common:to_register')}
        </Box>
      </Typography>
    </Box>
  );
};

export default EcpLoginForm;
