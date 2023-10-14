export interface StudyCategory {
  name: string;
  id: string;
  tests: StudyLevel[];
}

export interface StudyLevel {
  name: string;
  id: string;
}
