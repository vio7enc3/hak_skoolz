import i18n from '../i18n';

export const getMonthName = (month: number) => {
  switch (month) {
    case 1:
      return i18n.t('month.january');
    case 2:
      return i18n.t('month.february');
    case 3:
      return i18n.t('month.march');
    case 4:
      return i18n.t('month.april');
    case 5:
      return i18n.t('month.may');
    case 6:
      return i18n.t('month.june');
    case 7:
      return i18n.t('month.july');
    case 8:
      return i18n.t('month.august');
    case 9:
      return i18n.t('month.september');
    case 10:
      return i18n.t('month.october');
    case 11:
      return i18n.t('month.november');
    case 12:
      return i18n.t('month.december');
    default:
      return '';
  }
};
