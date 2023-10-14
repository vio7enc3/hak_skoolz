import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SessionState } from './types';
import _ from 'lodash';
import { axiosInstance } from '@/app/api';

const initialState: SessionState = {
  isLogged: localStorage.getItem('token') ? true : false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; authToken: string }>) {
      if (!action.payload) return;
      state.isLogged = true;
      // state.user = action.payload.user;
      // if (!_.isEmpty(action.payload?.legalEntity)) {
      // state.company = action.payload.legalEntity;
      // state.userType = 'company';
      // localStorage.setItem('company', JSON.stringify(action.payload.legalEntity));
      // } else {
      // state.userType = 'person';
      // }
      state.token = action.payload.authToken;
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${action.payload.authToken}`;
      localStorage.setItem('user', action.payload.email);
      localStorage.setItem('token', action.payload.authToken);
    },
    logout(state) {
      state.isLogged = false;
      state.company = undefined;
      state.user = undefined;
      state.token = '';
      state.balance = undefined;
      localStorage.removeItem('user');
      localStorage.removeItem('company');
      localStorage.removeItem('token');
      state = initialState;
    },
  },
});

export const { login, logout } = sessionSlice.actions;
