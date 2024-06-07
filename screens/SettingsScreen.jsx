import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { ConfigContext } from '../context/ConfigContext';

const SettingsScreen = () => {
  const { isDarkTheme, toggleTheme, language, changeLanguage } = useContext(ConfigContext);

  const languages = ['Español', 'Inglés', 'Francés'];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuración</Text>

      <View style={styles.row}>
        <Text style={styles.text}>Modo Oscuro</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>

      <View style={styles.languageContainer}>
        <Text style={styles.text}>Idioma</Text>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.languageButton,
              language === lang && styles.selectedLanguageButton
            ]}
            onPress={() => changeLanguage(lang)}
          >
            <Text
              style={[
                styles.languageText,
                language === lang && styles.selectedLanguageText
              ]}
            >
              {lang}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    color: '#333333',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  languageContainer: {
    width: '80%',
    marginBottom: 20,
  },
  languageButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderColor: '#6200ea',
    borderWidth: 1,
    alignItems: 'center',
  },
  selectedLanguageButton: {
    backgroundColor: '#6200ea',
  },
  languageText: {
    color: '#6200ea',
    fontWeight: 'bold',
  },
  selectedLanguageText: {
    color: '#ffffff',
  },
});

export default SettingsScreen;
