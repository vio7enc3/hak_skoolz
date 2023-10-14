import React, { PropsWithChildren, createContext, useState } from 'react';
import { RegistrationContextProps, RegistrationPageFormValues } from './types';
import { useForm } from 'react-hook-form';
import { RegistrationCheckResponse } from '@/entities/auth/model';

export const RegistrationContext = createContext<RegistrationContextProps>({
  setCheckResult: () => {},
});

export const RegistrationContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<RegistrationPageFormValues>({
    mode: 'onChange',
  });

  const [checkResult, setCheckResult] = useState<RegistrationCheckResponse>();
  return (
    <RegistrationContext.Provider
      value={{
        form,
        checkResult,
        setCheckResult,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
