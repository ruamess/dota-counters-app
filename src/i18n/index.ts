import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translationEn from './locales/en-US/translation.json';
import translationRu from './locales/ru-KZ/translation.json';
import translationDe from './locales/de-DE/translation.json';
import translationKk from './locales/kk-KZ/translation.json';
import translationFa from './locales/fa-IR/translation.json';
// import * as Localization from 'expo-localization';

const resources = {
  'ru-KZ': { translation: translationRu },
  'en-US': { translation: translationEn },
  'de-DE': { translation: translationDe },
  'kk-KZ': { translation: translationKk },
  'fa-IR': { translation: translationFa },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('language');

  if (!savedLanguage) {
    savedLanguage = 'en-US';
    await AsyncStorage.setItem('language', 'en-US');
    // savedLanguage = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: savedLanguage,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
