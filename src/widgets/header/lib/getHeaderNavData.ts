import { TFunction } from 'i18next';
import { HeaderNavData } from './types';

export const getHeaderNavData = (t: TFunction): HeaderNavData[] => [
  {
    label: t('common:header.nav.home'),
  },
  {
    label: t('common:header.nav.all_sections'),
  },
  {
    label: t('common:header.nav.purchases'),
    menu: [
      {
        label: t('plan_schedule'),
        href: '/schedule',
      },
      {
        label: t('store'),
        href: '/shop',
      },
      {
        label: t('auction'),
        href: '/auction',
      },
      {
        label: t('selection'),
        href: '/selection',
      },
      {
        label: t('tender'),
        href: '/tender',
      },
      {
        label: t('direct_purchases'),
        href: '/direct-purchases',
      },
    ],
  },
  {
    label: t('common:header.nav.purchases_range.title'),
    menu: [
      {
        label: t('common:header.nav.purchases_range.calculator'),
        href: '/calculator',
      },
      {
        label: t('common:header.nav.purchases_range.price_criteria'),
        href: '/price-criteria',
      },
    ],
  },
  {
    label: t('common:header.nav.info.title'),
    menu: [
      {
        label: t('common:header.nav.info.standart_forms_contracts'),
        href: '/standart-forms-contracts',
      },
      {
        label: t('common:header.nav.info.regulations'),
        href: '/regulations',
      },
    ],
  },
  {
    label: t('common:header.nav.purchases_subjects.title'),
    menu: [
      {
        label: t('common:header.nav.purchases_subjects.signle_vendors'),
        href: '/single-vendors',
      },
    ],
  },
];
