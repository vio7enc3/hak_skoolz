import { Invitation } from '@/app/api/model';

export interface SmsConfirmModalProps {
  onConfirm: (code: string) => Promise<void>;
  resendCode: () => Promise<void>;
  sucessCallback: () => void | Promise<void>;
}

export interface SmsConfirmModalRef {
  init: (phone: string) => void;
  close: () => void;
}

export interface ConfirmModalInitArgs {
  btnText?: string;
  btnColor?: 'primary' | 'error';
  text?: string;
  title?: string;
}

export interface ConfirmModalRef {
  init: (args: ConfirmModalInitArgs) => Promise<void>;
  close: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EmployeeModalFormValues {
  phone: string;
  pinfl: string;
  fullName: string;
}

export interface BaseEmployeeModalProps<T extends {} = {}> {
  onSubmit: (values: T) => void;
  title: string;
  data?: Invitation;
}
