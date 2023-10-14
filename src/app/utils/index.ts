import { SerializedError } from '@reduxjs/toolkit';
import { CustomError } from '../helpers/types';
import notify from '../providers/toaster/lib/notify';
import i18n from '../i18n';
import { FieldPath, FieldPathValue } from 'react-hook-form';
import _ from 'lodash';
import { ReactNode } from 'react';

type Response<T = unknown> =
  | {
      data: T;
    }
  | {
      error: CustomError | SerializedError;
    };

export const isDev = (): boolean => !!import.meta.env.DEV;

export const getLang = (): string => localStorage.getItem('lang') || 'uz';

export const getFetchEror = (error: CustomError | SerializedError) => {
  if ('status' in error && error.status === 'PARSING_ERROR') {
    return '';
  }
  if ('data' in error) {
    return error.data.error.msg;
  }

  return '';
};

export const handleResponse = <T>(res: Response<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    if ('error' in res) {
      const error = getFetchEror(res.error);
      notify(error, 'error');
      return reject(error);
    }
    resolve(res?.data);
  });
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = (error) => reject(error);
  });
};

export const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const file = new File([u8arr], filename, { type: mime });
  return file;
};

export const getBooleanLabel = (value: boolean): string => {
  const t = i18n.t.bind(i18n);

  return value ? t('yes') : t('no');
};

export const blobToBase64 = async (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = (error) => reject(error);
  });
};

interface GetLabelByValueArgs<T extends {}> {
  data: T[];
  key: FieldPath<T>;
  value: FieldPathValue<T, FieldPath<T>>;
  label: FieldPath<T>;
}

export function getLabelByValue<T extends {}>({ data, key, value, label }: GetLabelByValueArgs<T>) {
  const found = data.find((el) => _.get(el, key) == value);
  return _.get(found, label) ?? (value as ReactNode);
}

export const stringToNumeric = (value = ''): number => {
  return Number(value.replace(/[^\d.]/g, ''));
};