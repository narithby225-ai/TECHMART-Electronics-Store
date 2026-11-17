import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, getTranslation, getLanguages } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('techmart_language');
    return saved || 'en';
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('techmart_language', language);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Translation function (shorthand)
  const t = (key) => getTranslation(language, key);

  // Get current language details
  const getCurrentLanguage = () => ({
    code: language,
    name: translations[language]?.name || 'English',
    flag: translations[language]?.flag || '🇺🇸'
  });

  // Get all available languages
  const availableLanguages = getLanguages();

  // Change language
  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguage(langCode);
    }
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    getCurrentLanguage,
    availableLanguages,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
