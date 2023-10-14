export interface User {
  unique: number;
  name: string;
  PINFL: string;
  TIN: string;
  postAddress: string;
  regionName: string;
  regionId: number;
  districtId: string;
  districtName: string;
  email: string;
  birthday: string;
  createdAt: string;
  phone: string;
}

export type UserType = 'person' | 'company';

export interface Company {
  MFO: string;
  TIN: string;
  address: string;
  createdAt: string;
  director: string;
  districtName: string;
  name: string;
  numberAcc: string;
  regionName: string;
  unique: number;
  regionId: number;
  districtId: string;
  OKED: string;
  email: string;
  phone: string;
}

export interface Balance {
  availableBalance: number;
  blockedBalance: number;
}

export interface SessionState {
  isLogged: boolean;
  user?: User;
  userType?: UserType;
  company?: Company;
  token?: string;
  balance?: Balance;
}
