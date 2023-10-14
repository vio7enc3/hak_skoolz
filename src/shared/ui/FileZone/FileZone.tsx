import { Colors } from '@/app/constants';
import { Box } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { FileZoneProps, FileZoneRef } from './types';

const FileZone: React.ForwardRefRenderFunction<FileZoneRef, FileZoneProps> = (
  { children, onDrop, onPick, accept },
  ref
) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      click: onClickHandler,
    }),
    []
  );

  const onClickHandler = () => {
    inputRef.current?.click();
  };

  const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (onDrop) {
      onDrop(event.dataTransfer.files);
    }
    setIsDragOver(false);
  };

  return (
    <Box
      component='div'
      sx={{
        border: `2px dashed ${isDragOver ? Colors.PRIMARY : '#E5EFF5'}`,
        borderRadius: '6px',
        py: 2,
        px: 2.5,
        backgroundColor: '#F9FBFF',
        transition: 'all 0.3s ease',
      }}
      onDrop={onDropHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
    >
      {children}
      <input
        type='file'
        ref={inputRef}
        hidden
        onChange={(event) => {
          onPick?.(event.target.files);
        }}
        accept={accept}
      />
    </Box>
  );
};

export default forwardRef(FileZone);
