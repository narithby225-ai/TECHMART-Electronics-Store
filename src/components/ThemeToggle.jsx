import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Clock, Zap, Settings } from 'lucide-react';

export default function ThemeToggle({ isDarkMode, isAutoMode, toggleTheme, toggleAutoMode, timePeriod, themeMessage, darkMode }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get icon based on current mode
  const getThemeIcon = () => {
    if (isAutoMode) {
      return <Clock className="w-5 h-5" />;
    }
    return isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />;
  };

  // Get time-based greeting
  const getGreeting = () => {
    if (timePeriod === 'morning') return '🌅 Good Morning';
    if (timePeriod === 'afternoon') return '☀️ Good Afternoon';
    if (timePeriod === 'evening') return '🌆 Good Evening';
    return '🌙 Good Night';
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Main Toggle Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`relative p-2.5 rounded-xl border transition-all duration-300 ${
          darkMode
            ? 'border-slate-800 hover:bg-slate-800 text-amber-400'
            : 'border-slate-200 hover:bg-slate-100 text-slate-700'
        } ${isAutoMode ? 'animate-pulse' : ''}`}
        aria-label="Theme Settings"
      >
        {getThemeIcon()}
        
        {/* Auto Mode Indicator */}
        {isAutoMode && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
        )}
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div
          className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl border overflow-hidden z-50 ${
            darkMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-slate-200'
          }`}
        >
          {/* Header */}
          <div className={`p-4 border-b ${
            darkMode ? 'border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900' : 'border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-cyan-400" />
              <span className="font-bold">Theme Settings</span>
            </div>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {getGreeting()}
            </p>
          </div>

          {/* Auto Mode Toggle */}
          <div className="p-4">
            <div
              className={`p-3 rounded-lg border cursor-pointer transition ${
                isAutoMode
                  ? darkMode ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-cyan-50 border-cyan-200'
                  : darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
              onClick={toggleAutoMode}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className={`w-5 h-5 ${isAutoMode ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="font-semibold text-sm">Auto Mode</span>
                </div>
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${
                    isAutoMode ? 'bg-cyan-500' : darkMode ? 'bg-slate-700' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                      isAutoMode ? 'translate-x-5' : 'translate-x-0.5'
                    } mt-0.5`}
                  ></div>
                </div>
              </div>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {isAutoMode 
                  ? '✨ Theme changes automatically based on time of day'
                  : 'Manual theme control enabled'
                }
              </p>
            </div>

            {/* Current Theme Info */}
            <div className={`mt-3 p-3 rounded-lg border ${
              darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold">Current Status</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {isAutoMode ? themeMessage : `Manual mode: ${isDarkMode ? 'Dark' : 'Light'} theme`}
              </p>
            </div>
          </div>

          {/* Manual Theme Options */}
          <div className={`p-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="text-xs font-semibold mb-3 text-slate-400">Quick Toggle</div>
            <div className="grid grid-cols-2 gap-2">
              {/* Light Mode Button */}
              <button
                onClick={toggleTheme}
                disabled={isAutoMode}
                className={`p-3 rounded-lg border transition ${
                  !isDarkMode && !isAutoMode
                    ? 'bg-amber-50 border-amber-200'
                    : darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                } ${isAutoMode ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Sun className={`w-5 h-5 ${!isDarkMode && !isAutoMode ? 'text-amber-500' : 'text-slate-500'}`} />
                  <span className="text-xs font-medium">Light</span>
                  {!isDarkMode && !isAutoMode && (
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                  )}
                </div>
              </button>

              {/* Dark Mode Button */}
              <button
                onClick={toggleTheme}
                disabled={isAutoMode}
                className={`p-3 rounded-lg border transition ${
                  isDarkMode && !isAutoMode
                    ? 'bg-slate-700 border-slate-600'
                    : darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                } ${isAutoMode ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Moon className={`w-5 h-5 ${isDarkMode && !isAutoMode ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-medium">Dark</span>
                  {isDarkMode && !isAutoMode && (
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className={`p-4 border-t text-xs ${
            darkMode ? 'border-slate-700 bg-slate-900/50 text-slate-500' : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <span>Night (7 PM - 6 AM): Dark theme</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                <span>Day (6 AM - 7 PM): Light theme</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
