export interface RegistrationUserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  className?: string;
}

export interface RegistrationCheckResponse {
  newUser: boolean;
  unique: number;
}
