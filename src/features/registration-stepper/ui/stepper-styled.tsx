import { styled } from '@mui/material';
import { Stepper } from '@mui/material';

import { Colors } from '@/app/constants';

export const StepperStyled = styled(Stepper)(() => ({
  padding: '24px 20px',
  background: '#F4F5F7',
  borderRadius: '8px',
  '& .MuiStepLabel-label': {
    font: `14px`,
    color: Colors.DARK,
  },
  '& .MuiStepIcon-root': {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: `1px solid rgba(112, 125, 159, 0.2)`,
    color: Colors.TEXT_WHITE,
    circle: {
      cx: '13',
      cy: '13',
      r: '14',
    },
    '& .MuiStepIcon-text': {
      font: `14px`,
      fill: Colors.LIGHT_GRAY,
    },
    '&.Mui-active': {
      background: Colors.TURQUOISE,
      color: Colors.TURQUOISE,
      border: `1px solid ${Colors.TEXT_WHITE}`,
      '& .MuiStepIcon-text': {
        fill: Colors.TEXT_WHITE,
      },
    },
    '&.Mui-completed': {
      color: Colors.MEDIUM_BLUE,
      border: '1px solid white',
      '& .MuiStepIcon-text': {
        fill: Colors.TEXT_WHITE,
      },
    },
  },
}));
