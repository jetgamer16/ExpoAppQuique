import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './context/CartContext';
import HomeScreen from './screens/HomeScreen';
import BottomNav from './components/BottomNav';

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
    const loadTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (theme) {
        setIsDarkTheme(theme === 'dark');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    setIsDarkTheme(!isDarkTheme);
    await AsyncStorage.setItem('theme', !isDarkTheme ? 'dark' : 'light');
  };

  return (
    <CartProvider>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
