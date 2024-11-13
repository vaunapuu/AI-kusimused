import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en/translation.json";
import nlTranslation from "./nl/translation.json";

i18next.use(initReactI18next).init({
  lng: "en", // if you're using a language detector, do not define the lng option
  fallbackLng: "en",
  debug: true,
  resources: {
    en: {
      translation: enTranslation,
    },
    nl: {
      translation: nlTranslation,
    },
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  returnNull: false,
});
