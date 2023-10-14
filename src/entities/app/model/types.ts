export type CabinetType = "pupil" | "teacher";

export interface AppState {
  cabinetType: CabinetType;
  showBalance: boolean;
  sidebarCollapsed: boolean;
}

export interface Level {
  theme: string;
  number: number;
  id: number;
}

export interface LevelTests {
  id: number;
  number: number;
  themeName: string;
  tasks: {
    number: number;
    question: string;
    var1: string;
    var2: string;
    var3: string;
    var4: string;
    correctAnswer: string;
  }[];
}
