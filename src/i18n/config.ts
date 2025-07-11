import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import eeTranslation from "./ee/translation.json";
import enTranslation from "./en/translation.json";

i18next
  // currently not using the language detector, since we are using url params.
  //.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ee", // Default language if detection fails
    // debug: true,
    resources: {
      ee: {
        translation: eeTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
    detection: {
      // Prioritize localStorage over browser language
      order: [
        "localStorage",
        "querystring",
        "htmlTag",
        "navigator",
        "path",
        "subdomain",
      ],
      caches: ["localStorage"],
    },
    returnNull: false,
  });
