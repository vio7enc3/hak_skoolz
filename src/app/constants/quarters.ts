import i18n from "../i18n";
export interface IQuarter {
  value: number;
  label: string;
}

export function provideQuarters() {

  const quarters: IQuarter[] = [
    {
      value: 1,
      label: i18n.t('schedule_page.first_quarter'),
    },
    {
      value: 2,
      label: i18n.t('schedule_page.second_quarter'),
    },
    {
      value: 3,
      label: i18n.t('schedule_page.third_quarter'),
    },
    {
      value: 4,
      label: i18n.t('schedule_page.forth_quarter'),
    },
    {
      value: 0,
      label: i18n.t('schedule_page.all_quarters'),
    },
  ];

  return quarters;
}
