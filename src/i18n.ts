import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    dashboard: {
      title: 'Title',
      titleHint: 'Pleace provide a title for your content',
      description: 'Description',
      descriptionHint: 'Pleace provide a description for your content',
      descriptionPlaceholder: 'Write about react js form validation',
      generate: 'Generate',
    },
  },
  uz: {
    dashboard: {
      title: 'Sarlavha',
      titleHint: 'Iltimos, content uchun sarlavha kiriting',
      description: 'Tavsifi',
      descriptionHint: 'Iltimos kontent tavsifini yozing',
      descriptionPlaceholder: 'React js form validatsiyasi haqida yozing',
      generate: 'Yaritish',
    },
  },
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage'],
    },
  });

export default i18n;
