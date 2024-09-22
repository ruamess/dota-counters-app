import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n/index';

const changeLanguage = async (lang: string) => {
  const activeLangPromise = AsyncStorage.getItem('language');

  if ((await activeLangPromise) !== lang) {
    await AsyncStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  }
};

export default changeLanguage;
