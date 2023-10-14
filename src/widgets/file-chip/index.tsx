import { ButtonBase, Stack, Tooltip, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { ReactComponent as DownloadIcon } from '@/app/assets/icons/download.svg';

interface Props {
  file: {
    base64: string;
    name: string;
  };
}

export const FileChip: React.FC<Props> = ({ file }) => {
  const [ref, setRef] = useState<HTMLSpanElement | null>();

  const onFileClickHandler = () => {
    const link = document.createElement('a');
    link.href = file.base64;
    link.download = file.name;
    link.click();
  };

  const isTextBiggerThanContainer = !!ref && ref.scrollWidth > ref.clientWidth;

  return (
    <ButtonBase
      sx={{
        borderRadius: '6px',
      }}
      onClick={onFileClickHandler}
    >
      <Tooltip title={isTextBiggerThanContainer ? file.name : ''}>
        <Stack
          component='div'
          direction='row'
          alignItems='center'
          spacing={1.5}
          sx={{
            boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
            borderRadius: '6px',
            py: 1,
            px: 2,
            maxWidth: '150px',
          }}
        >
          <Typography
            ref={setRef}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {file.name}
          </Typography>

          <DownloadIcon />
        </Stack>
      </Tooltip>
    </ButtonBase>
  );
};
