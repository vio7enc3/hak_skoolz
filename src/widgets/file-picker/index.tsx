import { Colors } from '@/app/constants';
import FileZone from '@/shared/ui/FileZone/FileZone';
import { FileZoneRef } from '@/shared/ui/FileZone/types';
import { Box, Button, ButtonBase, ButtonProps, Stack, Typography } from '@mui/material';
import { forwardRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as XmarkIcon } from '@/app/assets/icons/xmark.svg';

interface Props {
  value: File[];
  onChange: (value: File[]) => void;
  accept?: string;
  disabled?: boolean;
  showFiles?: boolean;
  hideZone?: boolean;
  type?: 'button' | 'file-zone';
  ButtonProps?: ButtonProps;
}

export const FilePicker = forwardRef<HTMLDivElement, Props>(
  (
    {
      value = [],
      onChange,
      disabled,
      showFiles = true,
      accept,
      hideZone,
      type = 'file-zone',
      ButtonProps,
    },
    ref
  ) => {
    const { t } = useTranslation();

    const fileZoneRef = useRef<FileZoneRef>(null);

    const onPickHandler = (filelist: FileList | null) => {
      if (disabled) return;
      const file = filelist?.item(0);

      if (value.some((el) => el.name === file?.name)) return;
      if (file) {
        onChange([...value, file]);
      }
    };

    const onDeleteHandler = (index: number) => {
      if (disabled) return;
      onChange(value.filter((_, i) => i !== index));
    };

    if (type === 'button') {
      return (
        <Stack component='div' direction={'row'} spacing={1} useFlexGap flexWrap={'wrap'} ref={ref}>
          <Box sx={{ display: 'none' }}>
            <FileZone
              ref={fileZoneRef}
              onDrop={onPickHandler}
              onPick={onPickHandler}
              accept={accept}
            />
          </Box>
          <Button
            children={t('pick')}
            {...ButtonProps}
            onClick={() => {
              fileZoneRef.current?.click();
            }}
            disabled={disabled}
          />
          {!!showFiles &&
            value.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
                  borderRadius: '6px',
                  py: 1,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    mr: 1.5,
                  }}
                >
                  {file.name}
                </Box>
                {!disabled && (
                  <ButtonBase
                    onClick={() => {
                      onDeleteHandler(index);
                    }}
                  >
                    <Box
                      component={XmarkIcon}
                      sx={{
                        minWidth: '20px',
                        minHeight: '20px',
                        '& path': {
                          stroke: Colors.ERROR,
                        },
                      }}
                    />
                  </ButtonBase>
                )}
              </Box>
            ))}
        </Stack>
      );
    }

    return (
      <Box>
        {!hideZone && (
          <FileZone onDrop={onPickHandler} onPick={onPickHandler} ref={fileZoneRef} accept={accept}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  color: Colors.TEXT_SECONDARY,
                  fontWeight: 400,
                }}
              >
                {t('market.add_file_description')}
              </Typography>
              <Button
                children={t('pick')}
                {...ButtonProps}
                onClick={fileZoneRef.current?.click}
                disabled={disabled}
              />
            </Stack>
          </FileZone>
        )}
        {showFiles && (
          <Stack
            direction='row'
            spacing={1}
            sx={{
              mt: hideZone ? 0 : 1,
            }}
            useFlexGap
          >
            {value.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
                  borderRadius: '6px',
                  py: 1.5,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    mr: 1.5,
                  }}
                >
                  {file.name}
                </Box>
                {!disabled && (
                  <ButtonBase
                    onClick={() => {
                      onDeleteHandler(index);
                    }}
                  >
                    <Box
                      component={XmarkIcon}
                      sx={{
                        minWidth: '20px',
                        minHeight: '20px',
                        '& path': {
                          stroke: Colors.ERROR,
                        },
                      }}
                    />
                  </ButtonBase>
                )}
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    );
  }
);
