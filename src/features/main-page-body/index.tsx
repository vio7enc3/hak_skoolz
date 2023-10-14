import { Box, Stack } from '@mui/material';

import { ReactComponent as MathIcon } from '@/app/assets/icons/cabinet/math.svg';
import { ReactComponent as Alphatbet } from '@/app/assets/icons/cabinet/alphabet.svg';
import { ReactComponent as CyrillicAlphabet } from '@/app/assets/icons/cabinet/cyrillic-alphabet.svg';
import { ReactComponent as Geography } from '@/app/assets/icons/cabinet/flags.svg';

import { useTranslation } from 'react-i18next';
import { PlayCardItem } from './ui/play-card';

export interface IPlayCard {
  bgColor: string;
  title: string;
  btnText: string;
  btnDisabled?: boolean;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> & {
    title?: string | undefined;
  };
}

export const MainPageBody = () => {
  const { t } = useTranslation();

  const arrOfCards: IPlayCard[] = [
    {
      title: t('math'),
      Icon: MathIcon,
      btnText: t('next'),
      bgColor: t('#15C47B'),
    },
    {
      title: t('english'),
      Icon: Alphatbet,
      btnText: t('next'),
      bgColor: '#01A8BF',
      btnDisabled: true,
    },
    {
      title: t('russian'),
      Icon: CyrillicAlphabet,
      btnText: t('next'),
      bgColor: t('#15C4AC'),
      btnDisabled: true,
    },
    {
      title: t('geography'),
      Icon: Geography,
      btnText: t('developing'),
      bgColor: '#15C4AC99',
      btnDisabled: true,
    },
  ];

  return (
    <Box component='div' maxHeight='max-content'>
      <Stack direction='column' justifyContent='center' alignItems='center' spacing={3}>
        {arrOfCards.map((card) => (
          <PlayCardItem key={card.title} {...card} />
        ))}
      </Stack>
    </Box>
  );
};
