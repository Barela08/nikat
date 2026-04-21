import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLanguage, setLanguage } from '../utils/i18n';
import { StorageManager } from '../utils/storage';
import { Strings } from '../constants/Strings';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setCurrentLanguage] = useState('hi');
  const [translations, setTranslations] = useState(Strings.hi);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await StorageManager.getLanguage();
      setCurrentLanguage(savedLang);
      setTranslations(Strings[savedLang]);
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (langCode) => {
    setCurrentLanguage(langCode);
    setTranslations(Strings[langCode]);
    await StorageManager.setLanguage(langCode);
    await setLanguage(langCode);
  };

  const t = (key) => translations[key] || key;

  const value = { language, t, changeLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
