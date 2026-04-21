import AsyncStorage from '@react-native-async-storage/async-storage';
import { Strings } from '../constants/Strings';

const LANGUAGES = {
  hi: 'हिंदी',
  en: 'English',
  mr: 'मराठी',
};

const DEFAULT_LANGUAGE = 'hi';

export const getLanguageLabel = (langCode) => LANGUAGES[langCode] || LANGUAGES.en;

export const setLanguage = async (langCode) => {
  await AsyncStorage.setItem('language', langCode);
};

export const getLanguage = async () => {
  let lang = await AsyncStorage.getItem('language');
  if (!lang || !LANGUAGES[lang]) {
    lang = DEFAULT_LANGUAGE;
    await setLanguage(lang);
  }
  return lang;
};

export const t = (key, language) => {
  return Strings[language]?.[key] || Strings.en[key] || key;
};

// Hook
export const useTranslation = () => {
  const language = 'hi'; // Will be from context later
  return { t: (key) => t(key, language), language };
};
