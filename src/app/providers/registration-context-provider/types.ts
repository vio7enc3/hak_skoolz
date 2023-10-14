import { RegistrationCheckResponse } from '@/entities/auth/model';
import { UseFormReturn } from 'react-hook-form';

export interface RegistrationPageFormValues {
  phone: string;
  password: string;
  passwordConfirm: string;
}

export type RegistrationContextProps = {
  form?: UseFormReturn<RegistrationPageFormValues>;
  checkResult?: RegistrationCheckResponse;
  setCheckResult: React.Dispatch<React.SetStateAction<RegistrationCheckResponse | undefined>>;
};
