import { store } from '@/app/store';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

const ReduxProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { ReduxProvider };
