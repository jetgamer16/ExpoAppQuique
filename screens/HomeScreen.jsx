import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, Animated, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ConfigContext } from '../context/ConfigContext';
import { translations } from '../translations';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { language } = useContext(ConfigContext);
  const t = translations[language];
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(100));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handlePress = () => {
    navigation.navigate('Main');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>{t.welcome}</Text>
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
        <Text style={styles.subtitle}>{t.tapToContinue}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 16,
    color: 'black',
  },
});

export default HomeScreen;
