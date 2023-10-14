import { eimzo } from '@/entities/eimzo';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default () => {
  eimzo.startApi();
  dayjs.extend(customParseFormat);

  if (import.meta.env.DEV) {
    //@ts-ignore
    window.dayjs = dayjs;
  }
};
