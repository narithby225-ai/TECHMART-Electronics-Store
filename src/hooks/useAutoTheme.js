import { useState, useEffect } from 'react';

/**
 * Custom hook for automatic theme switching based on time of day
 * 
 * Time-based theme logic:
 * - Night (7 PM - 6 AM): Light mode - gentle on eyes, warm colors
 * - Day (6 AM - 7 PM): Dark mode - high contrast, better outdoor visibility
 * 
 * User can override with manual toggle
 */
export default function useAutoTheme() {
  // Check if user has manual preference
  const getInitialMode = () => {
    const saved = localStorage.getItem('techmart_theme_mode');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      isAuto: true,
      manualDarkMode: null
    };
  };

  const [themeMode, setThemeMode] = useState(getInitialMode);
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Determine if it's night time (7 PM to 6 AM)
  const isNightTime = () => {
    const hour = new Date().getHours();
    // Night: 19:00 (7 PM) to 06:00 (6 AM)
    // Use dark mode at night - easier on eyes in dark environment
    return hour >= 19 || hour < 6;
  };

  // Get theme based on time
  const getAutoTheme = () => {
    if (isNightTime()) {
      return 'dark'; // Dark mode at night - gentle on eyes
    } else {
      return 'light'; // Light mode during day - better visibility in bright light
    }
  };

  // Update theme
  useEffect(() => {
    let theme;
    
    if (themeMode.isAuto) {
      // Auto mode: based on time
      theme = getAutoTheme();
    } else {
      // Manual mode: use user preference
      theme = themeMode.manualDarkMode ? 'dark' : 'light';
    }
    
    setCurrentTheme(theme);
    
    // Save to localStorage
    localStorage.setItem('techmart_theme_mode', JSON.stringify(themeMode));
  }, [themeMode]);

  // Check time every minute to auto-update theme
  useEffect(() => {
    if (!themeMode.isAuto) return;

    const interval = setInterval(() => {
      const newTheme = getAutoTheme();
      if (newTheme !== currentTheme) {
        setCurrentTheme(newTheme);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [themeMode.isAuto, currentTheme]);

  // Toggle between auto and manual mode
  const toggleAutoMode = () => {
    setThemeMode(prev => ({
      ...prev,
      isAuto: !prev.isAuto,
      manualDarkMode: prev.isAuto ? (currentTheme === 'dark') : prev.manualDarkMode
    }));
  };

  // Manual theme toggle (sets to manual mode)
  const toggleTheme = () => {
    setThemeMode({
      isAuto: false,
      manualDarkMode: currentTheme === 'light'
    });
  };

  // Get current time period for display
  const getTimePeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 19) return 'evening';
    return 'night';
  };

  // Get theme recommendation message
  const getThemeMessage = () => {
    const period = getTimePeriod();
    if (period === 'night') {
      return 'Night mode: Dark theme for eye comfort';
    } else if (period === 'morning') {
      return 'Morning: Light theme for clarity';
    } else if (period === 'afternoon') {
      return 'Afternoon: Light theme for visibility';
    } else {
      return 'Evening: Transitioning to dark mode';
    }
  };

  return {
    isDarkMode: currentTheme === 'dark',
    isAutoMode: themeMode.isAuto,
    toggleTheme,
    toggleAutoMode,
    timePeriod: getTimePeriod(),
    themeMessage: getThemeMessage(),
    isNightTime: isNightTime()
  };
}
