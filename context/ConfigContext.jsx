import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [language, setLanguage] = useState('Español');

  useEffect(() => {
    const loadSettings = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedTheme) setIsDarkTheme(savedTheme === 'dark');
      if (savedLanguage) setLanguage(savedLanguage);
    };
    loadSettings();
  }, []);

  const toggleTheme = async () => {
    setIsDarkTheme(!isDarkTheme);
    await AsyncStorage.setItem('theme', !isDarkTheme ? 'dark' : 'light');
  };

  const changeLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    await AsyncStorage.setItem('language', newLanguage);
  };

  return (
    <ConfigContext.Provider value={{ isDarkTheme, toggleTheme, language, changeLanguage }}>
      {children}
    </ConfigContext.Provider>
  );
};
