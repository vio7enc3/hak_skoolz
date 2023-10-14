import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { numericFormatter } from 'react-number-format';

interface Props {
  link: string;
}

export const DocxSizeComponent: React.FC<Props> = ({ link }) => {
  const { t } = useTranslation();
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    fetch(link, { method: 'HEAD' })
      .then((response) => {
        const contentLength = response.headers.get('content-length');
        setSize(contentLength);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [link]);

  return (
    <Box>
      <Stack direction='column' spacing={1}>
        <Typography>{t('individual_company_page.file_size')}:</Typography>
        <Typography>
          {size && numericFormatter((+size / 1024).toFixed(0), { thousandSeparator: ' ' })}{' '}
          {t('individual_company_page.kbyte')}
        </Typography>
      </Stack>
      <Box component='span'></Box>
    </Box>
  );
};
