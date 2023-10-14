import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(Backend)
  .init(
    {
      ns: ["common", "registration", "errors", "login", "header"],
      defaultNS: "common",
      lng: localStorage.getItem("lang") ?? "uz",
      fallbackLng: "uz",
      interpolation: {
        escapeValue: false,
      },
      returnObjects: true,
      cleanCode: true,
      react: {
        useSuspense: true,
      },
      backend: {
        loadPath: import.meta.env.DEV
          ? "/public/locales/{{lng}}/{{ns}}.json"
          : "/locales/{{lng}}/{{ns}}.json",
      },
    },
    (error) => {
      if (error) return console.error(error);
    }
  )
  .catch((error) => Promise.reject(error));

export default i18n;
