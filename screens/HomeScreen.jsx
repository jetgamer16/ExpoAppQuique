import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
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
        <Text style={styles.title}>Bienvenido a la Carta Digital</Text>
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
        <Text style={styles.subtitle}>Pulsa para continuar</Text>
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
