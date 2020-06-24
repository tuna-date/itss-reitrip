import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEng from "./locales/en/translation.json";
import translationVie from "./locales/vie/translation.json";
import translationJap from "./locales/jap/translation.json";
i18n
  .use(XHR)
  // .use(LanguageDetector)
  .init({
    debug: true,
    lng: "jap",
    fallbackLng: "jap", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    resources: {
      en: {
        translations: translationEng
      },
      vie: {
        translations: translationVie
      },
      jap: {
        translations: translationJap
      }
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations"
  });

export default i18n;
