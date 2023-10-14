import dayjs from 'dayjs';
import i18n from '../i18n';

export interface IMonthAndYearOption {
  value: number;
  label: string;
}

export function provideMonths(value?: number) {
  const months: IMonthAndYearOption[] = [
    {
      value: 1,
      label: i18n.t('month.january'),
    },
    {
      value: 2,
      label: i18n.t('month.february'),
    },
    {
      value: 3,
      label: i18n.t('month.march'),
    },
    {
      value: 4,
      label: i18n.t('month.april'),
    },
    {
      value: 5,
      label: i18n.t('month.may'),
    },
    {
      value: 6,
      label: i18n.t('month.june'),
    },
    {
      value: 7,
      label: i18n.t('month.july'),
    },
    {
      value: 8,
      label: i18n.t('month.august'),
    },
    {
      value: 9,
      label: i18n.t('month.september'),
    },
    {
      value: 10,
      label: i18n.t('month.october'),
    },
    {
      value: 11,
      label: i18n.t('month.november'),
    },
    {
      value: 12,
      label: i18n.t('month.december'),
    },
  ];

  if (value) {
    return months.find((month) => month.value === value);
  }

  return months;
}

export function provideYears(value?: number) {
  const currentYear = dayjs().year();
  const years = [];

  for (let year = 2023; year <= currentYear + 30; year++) {
    years.push({
      value: year,
      label: String(year),
    });
  }

  if (value) {
    return years.find((year) => year.value === value);
  }

  return years;
}
