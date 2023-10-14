import React from 'react';
import { MainPageBody } from '@/features/main-page-body';
import { CabinetLayout } from '@/features/cabinet-layout';

export const MainPage: React.FC = () => {
  return (
    <CabinetLayout>
      <MainPageBody />
    </CabinetLayout>
  );
};
