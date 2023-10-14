import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Box, Dialog, FormControl, FormLabel, Grid, Stack } from '@mui/material';
import ModalTemplate from '@/shared/ModalTemplate/ModalTemplate';
import UICheckbox from '../UICheckbox/UICheckbox';
import FormFormattedInput from '@/shared/inputs/FormFormattedInput/FormFormattedInput';
import { useLazyGetAllPermissionsQuery } from '@/app/api';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/shared/inputs';
import _ from 'lodash';

import { BaseModalRef } from '@/app/helpers/types';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/app/constants';
import { BaseEmployeeModalProps, EmployeeModalFormValues } from './types';

export const ManageEmployeeModal = forwardRef<
  BaseModalRef,
  BaseEmployeeModalProps<EmployeeModalFormValues>
>(({ onSubmit, title, data }, ref) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<EmployeeModalFormValues>();

  const [getAllPermissions, { data: permissions }] = useLazyGetAllPermissionsQuery({});

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
      close: onCloseHandler,
    }),
    []
  );

  useEffect(() => {
    if (!open) return;
    getAllPermissions({}, true);
  }, [open]);

  useEffect(() => {
    if (data && !_.isEmpty(data)) {
      reset({
        fullName: data.legalEntity,
        phone: data.phone.slice(3),
        pinfl: data.pinfl,
      });
    }
  }, [data]);

  const onCloseHandler = () => {
    setOpen(false);
  };

  const onSubmitHandler = (values: EmployeeModalFormValues) => {
    onSubmit(values);
  };

  return (
    <Dialog
      open={open}
      onClose={onCloseHandler}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '900px',
        },
      }}
    >
      <ModalTemplate
        title={title}
        onClose={onCloseHandler}
        submitBtnText={t('send_invite')}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Grid container spacing={4}>
          <Grid item maxHeight={250} xs={6}>
            <Stack direction='column' spacing={3}>
              <FormControl>
                <FormLabel>{t('phone')}:</FormLabel>
                <FormFormattedInput
                  control={control}
                  name='phone'
                  regExp={/\d+/}
                  rules={{
                    required: true,
                    validate: (val) => {
                      if (val.replace(/\D/g, '').length < 9) return t('errors:phone_pattern_error');
                      return true;
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          pr: 2,
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          borderRight: `1px solid ${Colors.BORDER}`,
                        }}
                      >
                        +998
                      </Box>
                    ),
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>{t('pinfl')}:</FormLabel>
                <FormTextInput
                  control={control}
                  name='pinfl'
                  rules={{
                    required: true,
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>{t('full_name')}:</FormLabel>
                <FormTextInput
                  control={control}
                  name='fullName'
                  rules={{
                    required: true,
                  }}
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction='column'
              maxHeight={250}
              spacing={1}
              sx={{
                overflowY: 'auto',
                '::-webkit-scrollbar': {
                  width: '10px',
                },
                '::-webkit-scrollbar-thumb': {
                  backgroundColor: Colors.TEXT_SECONDARY,
                  borderRadius: '4px',
                },
                '::-webkit-scrollbar-track': {
                  backgroundColor: Colors.ANOTHER_LIGHT_BLUE,
                  borderRadius: '5px',
                },
                '::-webkit-scrollbar-corner': {
                  background: 'transparent',
                },
              }}
            >
              {permissions?.data.map((permission) => (
                <Stack
                  key={permission.name}
                  direction='row'
                  justifyContent='flex-start'
                  spacing={1}
                >
                  <UICheckbox label={permission.name} />
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </ModalTemplate>
    </Dialog>
  );
});
