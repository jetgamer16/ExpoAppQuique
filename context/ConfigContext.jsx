import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [language, setLanguage] = useState('Español');

  useEffect(() => {
    const loadSettings = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) setLanguage(savedLanguage);
    };
    loadSettings();
  }, []);

  const changeLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    await AsyncStorage.setItem('language', newLanguage);
  };

  return (
    <ConfigContext.Provider value={{ language, changeLanguage }}>
      {children}
    </ConfigContext.Provider>
  );
};
