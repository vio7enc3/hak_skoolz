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
  btnColor?: "primary" | "error";
  text?: string;
  title?: string;
}

export interface ConfirmModalRef {
  init: (args: ConfirmModalInitArgs) => Promise<void>;
  close: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
