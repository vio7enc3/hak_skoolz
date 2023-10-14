export type CabinetType = 'pupil' | 'teacher';

export interface AppState {
  cabinetType: CabinetType;
  showBalance: boolean;
  sidebarCollapsed: boolean;
}
