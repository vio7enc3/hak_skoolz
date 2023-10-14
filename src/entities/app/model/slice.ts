import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState, CabinetType } from './types';

const initialState: AppState = {
  cabinetType: (localStorage.getItem('cabinetType') as AppState['cabinetType']) || 'customer',
  showBalance: localStorage.getItem('showBalance') === 'true',
  sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCabinetType: (state, action: PayloadAction<CabinetType>) => {
      localStorage.setItem('cabinetType', action.payload);
      state.cabinetType = action.payload;
    },
    setShowBalance: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem('showBalance', action.payload.toString());
      state.showBalance = action.payload;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem('sidebarCollapsed', action.payload.toString());
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const { setCabinetType, setShowBalance, setSidebarCollapsed } = appSlice.actions;
