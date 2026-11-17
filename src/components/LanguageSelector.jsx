import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector({ darkMode }) {
  const { language, setLanguage, getCurrentLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const currentLang = getCurrentLanguage();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
          darkMode
            ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200'
        }`}
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-2xl">{currentLang.flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{currentLang.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border overflow-hidden z-50 ${
            darkMode
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          }`}
        >
          {/* Header */}
          <div className={`px-4 py-3 border-b ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold">Select Language</span>
            </div>
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Choose your preferred language
            </p>
          </div>

          {/* Language Options */}
          <div className="max-h-80 overflow-y-auto">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 flex items-center gap-3 transition ${
                  darkMode
                    ? 'hover:bg-slate-700 text-white'
                    : 'hover:bg-slate-50 text-slate-900'
                } ${language === lang.code ? (darkMode ? 'bg-slate-700/50' : 'bg-cyan-50') : ''}`}
              >
                {/* Flag */}
                <span className="text-2xl">{lang.flag}</span>
                
                {/* Language Name */}
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{lang.name}</div>
                  <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {lang.code.toUpperCase()}
                  </div>
                </div>
                
                {/* Check Mark for Selected */}
                {language === lang.code && (
                  <Check className="w-5 h-5 text-cyan-400" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className={`px-4 py-2 border-t text-xs text-center ${
            darkMode ? 'border-slate-700 bg-slate-900/50 text-slate-500' : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}>
            More languages coming soon
          </div>
        </div>
      )}
    </div>
  );
}
