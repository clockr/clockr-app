import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import translations from './locales/de/translation.json';

i18n
  .use(Backend)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'de',
    lng: 'de',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      de: {
        translation: translations,
      },
    },
  })
  .then();

export default i18n;
