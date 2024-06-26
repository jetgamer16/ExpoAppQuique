import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';
import { ConfigContext } from '../context/ConfigContext';
import { translations } from '../translations';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useContext(CartContext);
  const { language } = useContext(ConfigContext);
  const t = translations[language];
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // Animación para el texto de carrito vacío
  const [buttonAnim] = useState(new Animated.Value(0)); // Animación para el botón de productos

  useEffect(() => {
    if (cart.length === 0) {
      const fadeInOut = () => {
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => fadeInOut());
      };

      fadeInOut();

      const blinkButton = () => {
        Animated.sequence([
          Animated.timing(buttonAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(buttonAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ]).start(() => blinkButton());
      };

      blinkButton();
    }
  }, [fadeAnim, buttonAnim, cart]);

  const buttonBackgroundColor = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#6200ea', 'gold'],
  });

  const handlePayment = () => {
    clearCart();
    Alert.alert(
      t.paymentSuccessTitle,
      t.paymentSuccessMessage,
      [{ text: 'OK', onPress: () => navigation.navigate('Products') }],
      { cancelable: false }
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + (parseFloat(product.price) * product.quantity), 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <>
          <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={{ paddingBottom: 40, fontSize: 35 }}>{t.noItemsInCart}</Text>
          </Animated.View>
          <Animated.View style={[styles.buttonContainer, { backgroundColor: buttonBackgroundColor }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Products')}>
              <Text style={styles.buttonText}>{t.products}</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={{ paddingBottom: 40, fontSize: 35 }}>Carrito</Text>
          {cart.map(product => (
            <View key={product.id} style={styles.card}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.price}>${product.price}</Text>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantity}>{`${t.quantity}: ${product.quantity}`}</Text>
                <Button title="+" onPress={() => addToCart(product)} color="#6200ea" />
              </View>
              <Button title={t.removeFromCart} onPress={() => removeFromCart(product.id)} color="#6200ea" />
            </View>
          ))}
          <Text style={styles.totalText}>{`Total: $${calculateTotal()}`}</Text>
          <View style={styles.paymentButtonContainer}>
            <Button title={t.payNow} onPress={handlePayment} color="#6200ea" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a3856f', 
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    width: '100%', 
  },
  card: {
    width: '90%',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantity: {
    fontSize: 16,
    color: '#333333',
    marginRight: 10,
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  paymentButtonContainer: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center', 
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default CartScreen;
