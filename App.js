import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './context/CartContext';
import { ConfigProvider } from './context/ConfigContext';
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
