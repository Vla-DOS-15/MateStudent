import React, { useState, useEffect } from 'react';
import './ThemeMode.css';
import { ReactComponent as Sun } from './sun.svg';
import { ReactComponent as Moon } from './moon.svg';

const ThemeMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const setDarkMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'dark');
  };

  const setLightMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'light');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, [isDarkMode]);

  return (
    <div className="toggle-container">
      <div className={`toggle ${isDarkMode ? 'active' : ''}`} onClick={toggleTheme}>
        <Sun className={`theme-icon sun ${isDarkMode ? '' : 'hidden'}`} />
        <Moon className={`theme-icon moon ${isDarkMode ? 'hidden' : ''}`} />
      </div>
    </div>
  );
};

export default ThemeMode;
