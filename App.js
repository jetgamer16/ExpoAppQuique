import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './context/CartContext';
import { ConfigProvider, ConfigContext } from './context/ConfigContext';
import HomeScreen from './screens/HomeScreen';
import BottomNav from './components/BottomNav';
import ProductsScreen from './screens/ProductsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import CartScreen from './screens/CartScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator initialRouteName="Products">
    <Stack.Screen 
      name="BottomNav" 
      component={BottomNav} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

const HomeStackNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="Main" 
      component={MainStackNavigator} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const theme = await AsyncStorage.getItem('theme');
      const language = await AsyncStorage.getItem('language');
      if (theme) setIsDarkTheme(theme === 'dark');
      if (language) setLanguage(language);
    };
    loadSettings();
  }, []);

  return (
    <ConfigProvider>
      <CartProvider>
        <NavigationContainer>
          <HomeStackNavigator />
        </NavigationContainer>
      </CartProvider>
    </ConfigProvider>
  );
};

export default App;