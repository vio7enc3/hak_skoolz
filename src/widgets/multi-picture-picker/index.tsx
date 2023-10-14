import React, { useRef } from 'react';
import FileZone from '@/shared/ui/FileZone/FileZone';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { fileToBase64 } from '@/app/utils';

import ImagePlaceholder from '@/app/assets/images/image_placeholder.png';
import { ReactComponent as CrossIcon } from '@/app/assets/icons/xmark.svg';

import { useTranslation } from 'react-i18next';
import { Colors } from '@/app/constants';
import { FileZoneRef } from '@/shared/ui/FileZone/types';

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  filesBase64: string[];
  setFilesBase64: React.Dispatch<React.SetStateAction<string[]>>;
  disabled?: boolean;
  onClickDeleteFile: (file: string, picture: string) => void;
  accept?: string;
}

export const MultiPicturePicker: React.FC<Props> = ({
  files,
  setFiles,
  setFilesBase64,
  filesBase64,
  disabled,
  onClickDeleteFile,
  accept = 'image/*',
}) => {
  const { t } = useTranslation();

  const fileZoneRef = useRef<FileZoneRef>(null);

  const onClickHandler = () => {
    fileZoneRef.current?.click();
  };

  const fileAddHandler = async (filelist: FileList | null) => {
    if (disabled) return;
    if (files.length > 4) return;
    const file = filelist?.item(0);

    // if (!file) return;

    // const allowedExtensions = accept;
    // const extension = file?.name.split('.').pop()?.toLowerCase();

    // if (!extension || !allowedExtensions?.includes(extension)) {
    //   return notify(`${t('images_only')} ${extension}`, 'error');
    // }

    if (file) {
      const base64 = await fileToBase64(file);
      setFilesBase64((prev) => [...prev, base64]);
      setFiles((prev) => [...prev, file]);
    }
  };

  return (
    <FileZone ref={fileZoneRef} onDrop={fileAddHandler} onPick={fileAddHandler} accept={accept}>
      <Grid container spacing={3}>
        <Grid item md={12} lg={6}>
          <Stack spacing={1.5}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                minHeight: '256px',
                border: '1px solid #E5EFF5',
                backgroundColor: '#F4F8FF',
                flex: 1,
                borderRadius: '2px',
                position: 'relative',
              }}
            >
              <Box
                component='img'
                src={filesBase64?.[0] || ImagePlaceholder}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
              {!!filesBase64?.[0] && !disabled && (
                <Box
                  component={CrossIcon}
                  width={50}
                  sx={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    right: -15,
                    zIndex: 99999,
                    '& path': {
                      stroke: Colors.ERROR,
                    },
                  }}
                  onClick={() => onClickDeleteFile(filesBase64?.[0], files?.[0].name)}
                />
              )}
            </Box>
            <Stack direction='row' spacing={1.5}>
              {new Array(4).fill(null).map((_, index) => {
                const file = filesBase64?.[index + 1];

                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #E5EFF5',
                      backgroundColor: '#F4F8FF',
                      flex: 1,
                      minHeight: '57px',
                      borderRadius: '2px',
                      position: 'relative',
                    }}
                  >
                    <Box
                      component='img'
                      src={file || ImagePlaceholder}
                      sx={{
                        maxWidth: file ? '100%' : '20px',
                        maxHeight: file ? '100%' : '20px',
                      }}
                    />
                    {file && !disabled && (
                      <Box
                        component={CrossIcon}
                        width={50}
                        sx={{
                          cursor: 'pointer',
                          position: 'absolute',
                          top: 0,
                          right: -15,
                          zIndex: 99999,
                          '& path': {
                            stroke: Colors.ERROR,
                          },
                        }}
                        onClick={() => onClickDeleteFile(file, files[index + 1].name)}
                      />
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Grid>
        <Grid item md={12} lg={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Typography
              sx={{
                fontSize: '1rem',
                color: Colors.TEXT_SECONDARY,
                fontWeight: 400,
                maxWidth: '220px',
                textAlign: 'center',
              }}
            >
              {t('market.add_picture_description')}
            </Typography>

            <Button
              sx={{
                mt: 2.5,
              }}
              onClick={onClickHandler}
              disabled={files.length > 4 || disabled}
            >
              {t('pick')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </FileZone>
  );
};
