import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, Animated, Text, StyleSheet, ImageBackground } from 'react-native';
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
    <ImageBackground 
      source={{ uri: 'https://marketplace.canva.com/EAF5V9i5G5g/1/0/1600w/canva-logotipo-cafeter%C3%ADa-figurativo-caf%C3%A9-y-beige-rxcvtLtKSx8.jpg' }} 
      style={styles.background}
    >
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>{t.welcome}</Text>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.subtitle}>{t.tapToContinue}</Text>
        </Animated.View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeScreen;
