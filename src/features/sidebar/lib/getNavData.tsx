import LogoIcon from '@/app/assets/icons/header/edukidz-logo.svg';
import BookIcon from '@/app/assets/icons/sidebar/book-icon.png';
import StarIcon from '@/app/assets/icons/sidebar/start-icon.png';
import GamepadIcon from '@/app/assets/icons/sidebar/gamepad-icon.png';
import GirlIcon from '@/app/assets/icons/sidebar/girl-icon.png';

import { NavItem } from './types';
import { TFunction } from 'i18next';

export const getNavData = (t: TFunction): NavItem[] => {
  return [
    {
      icon: LogoIcon,
      label: '',
      // condition: ({ userType }) => userType === 'company',
      items: [],
    },
    {
      icon: BookIcon,
      label: t('study'),
      to: '#',
      // condition: ({ userType }) => userType === 'person',
    },
    {
      icon: GamepadIcon,
      label: t('training'),
      to: '#',
      // condition: ({ userType }) => userType === 'person',
    },
    {
      icon: StarIcon,
      label: t('rating'),
      to: '#',
      // condition: ({ userType, cabinetType }) =>
      // userType === 'company' && cabinetType !== 'contractor',
    },
    {
      icon: GirlIcon,
      label: t('profile'),
      to: '#',
      // condition: ({ userType }) => userType === 'company',
      items: [],
    },
  ];
};
