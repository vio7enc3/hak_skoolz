import i18n from "@/app/i18n";
import { StudyCategory } from "@/entities/study/model";

const t = i18n.t.bind(i18n);

export const studyCategories: StudyCategory[] = [
  {
    name: "Сложение",
    id: "addition",
    tests: [
      {
        name: "1 уровень",
        id: "1",
      },
      {
        name: "2 уровень",
        id: "2",
      },
      {
        name: "3 уровень",
        id: "3",
      },
      {
        name: "4 уровень",
        id: "4",
      },
    ],
  },
];
