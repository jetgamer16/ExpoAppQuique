import React from 'react';
import { Switch, View, Text, Button, StyleSheet } from 'react-native';

const SettingsScreen = ({ toggleTheme, isDarkTheme, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dark Theme</Text>
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
});

export default SettingsScreen;
