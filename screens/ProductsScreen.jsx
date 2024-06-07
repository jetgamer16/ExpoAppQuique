import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import { CartContext } from '../context/CartContext';
import { ConfigContext } from '../context/ConfigContext';
import { translations } from '../translations';

const ProductsScreen = () => {
  const { addToCart } = useContext(CartContext);
  const { language } = useContext(ConfigContext);
  const t = translations[language];
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (products.length === 0) {
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
    }
  }, [fadeAnim, products]);

  const products = [
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: '10.00' },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: '20.00' },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: '30.00' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t.products}</Text>
      {products.length === 0 ? (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.emptyText}>{t.noProducts}</Text>
        </Animated.View>
      ) : (
        products.map(product => (
          <View key={product.id} style={styles.card}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Button title={t.addToCart} onPress={() => addToCart(product)} color="#6200ea" />
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:70,
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
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
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
});

export default ProductsScreen;
