import i18n from '../i18n';

export function provideHeadersForAddingSchedules() {
  const headers: string[] = [
    '№',
    i18n.t('add_a_schedule_page.month'),
    i18n.t('add_a_schedule_page.source_of_finance'),
    i18n.t('add_a_schedule_page.product_service_service'),
    i18n.t('add_a_schedule_page.quantity'),
    i18n.t('add_a_schedule_page.measure'),
    '',
  ];

  return headers;
}
