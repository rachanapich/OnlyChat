import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './en/translation.json';
import fr from './fr/translation.json';
import it from './it/translation.json';
import jp from './jp/translation.json';

export const translationsJson = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
  jp: {
    translation: jp,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: translationsJson,
  });

export default i18n;
