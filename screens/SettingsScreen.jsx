import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ConfigContext } from '../context/ConfigContext';
import { translations } from '../translations';

const SettingsScreen = () => {
  const { language, changeLanguage } = useContext(ConfigContext);
  const t = translations[language];

  const languages = ['Español', 'Inglés', 'Francés'];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t.settings}</Text>
      <View style={styles.languageContainer}>
        <Text style={styles.text}>{t.language}</Text>
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
    paddingTop:90,
    flex: 1,
    backgroundColor: 'rgba(139,69,19,0.5)', 
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  text: {
    fontSize: 18,
    color: 'white',
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
