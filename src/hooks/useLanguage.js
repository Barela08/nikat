import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Strings } from '../constants/Strings';

/**
 * Custom hook for language management
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  const { language } = context;
  const strings = Strings[language] || Strings['en'];

  return {
    ...context,
    strings,
  };
};
