import React, { forwardRef, useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import UISelect from '../inputs/UISelect/UISelect';
import { getAllCertificates } from '@/entities/eimzo/api';
import _ from 'lodash';
import dayjs from 'dayjs';

import { ReactComponent as DownChevron } from '@/app/assets/icons/down-chevron.svg';
import { ReactComponent as ContractIcon } from '@/app/assets/icons/contract.svg';

import { Cert } from '@/entities/eimzo/model/types';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/app/constants';

interface Props {
  onChange?: (value: Cert | null) => void;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  name?: string;
  value?: Cert | null;
  invalid?: boolean;
  helperText?: string;
}

const EcpSelect = forwardRef<{}, Props>(
  ({ onChange, onBlur, value, name, invalid, helperText }, ref) => {
    const { t } = useTranslation();
    const [options, setOptions] = useState<Cert[]>([]);
    const [currentValue, setCurrentValue] = useState<Cert | null>(null);

    useEffect(() => {
      getData();
    }, []);

    useEffect(() => {
      setCurrentValue(value ?? null);
    }, [value]);

    const getData = async () => {
      const data = await getAllCertificates();
      setOptions(_.uniqBy(data, 'serialNumber'));
    };

    const onChangeHandler = (value: Cert | null) => {
      setCurrentValue(value);
      onChange && onChange(value);
    };

    const filterOptionsHandle = (value: string | undefined) => {
      if (value) {
        const filteredCerts = options.filter((option) => {
          const searchTerms = [
            option.inn,
            option.parsedAlias['1.2.860.3.16.1.2'],
            option.parsedAlias.cn,
            option.parsedAlias.o,
          ];

          return searchTerms.some((term) =>
            term?.toLowerCase().includes(value.toLowerCase() ?? '')
          );
        });

        return filteredCerts;
      }
    };

    return (
      <UISelect
        ref={ref}
        options={options}
        value={currentValue}
        TextFieldProps={{
          placeholder: t('chose_ecp_key'),
          name,
          error: invalid,
          helperText,
        }}
        onChange={(_event, option) => onChangeHandler(option)}
        onBlur={onBlur}
        renderOption={(props, option) => {
          const { serialNumber, inn = '', overdue, parsedAlias } = option;
          const pinfl = parsedAlias?.['1.2.860.3.16.1.2'] || '';
          const { validto, o, cn } = parsedAlias;

          const isJur = inn.length === 9 && +inn[0] < 4;

          return (
            <Box component='li' {...props} key={serialNumber}>
              <Box
                sx={{
                  width: '100%',
                  py: 1,
                }}
              >
                <Stack direction='row' mb={1}>
                  <ContractIcon />
                  <Box
                    sx={{
                      ml: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.15rem',
                        mb: '5px',
                        lineHeight: 1,
                      }}
                    >
                      {isJur ? o?.toUpperCase() ?? '' : cn?.toLocaleUpperCase() ?? ''}
                    </Typography>
                    <Typography
                      color={Colors.TEXT_SECONDARY}
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {isJur ? t('jur_person') : t('phis_person')}
                    </Typography>
                  </Box>
                </Stack>
                <Stack spacing={1}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {t('sert_num')}: {serialNumber}
                  </Typography>
                  {isJur && (
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {t('tin')}: {inn}
                    </Typography>
                  )}
                  <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {isJur ? `${t('full_name')}: ${cn.toUpperCase()}` : `${t('pinfl')}: ${pinfl}`}
                    </Typography>
                    <Typography
                      color={overdue ? Colors.ERROR : Colors.SUCCESS}
                      sx={{
                        fontWeight: 500,
                        p: '4px 8px',
                        borderRadius: '20px',
                        backgroundColor: overdue ? `${Colors.ERROR}1A` : `${Colors.SUCCESS}1A`,
                      }}
                    >
                      {t('until')} {dayjs(validto, 'YYYY.MM.DD').format('DD.MM.YYYY')}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              {/* <Divider /> */}
            </Box>
          );
        }}
        getOptionLabel={(option) =>
          `${
            option.inn.length === 9 && +option.inn[0] < 4
              ? option.parsedAlias.o?.toUpperCase()
              : option.parsedAlias.cn?.toUpperCase()
          } ${
            option.inn.length === 9 && +option.inn[0] < 4
              ? `(${t('tin')}: ${option.inn})`
              : `(${t('pinfl')}: ${option.parsedAlias['1.2.860.3.16.1.2'] as string})`
          }`
        }
        getOptionDisabled={(option) => option.overdue ?? false}
        filterOptions={(options, state) => {
          const { inputValue } = state;
          const optionsToSet = filterOptionsHandle(inputValue);

          if (optionsToSet) {
            return optionsToSet;
          }

          return options;
        }}
        popupIcon={<DownChevron />}
      />
    );
  }
);

export default EcpSelect;
