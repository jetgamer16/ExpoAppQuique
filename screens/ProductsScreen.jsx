import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';

const ProductsScreen = () => {
  const { addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1' },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2' },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3' },
  ];

  return (
    <View style={styles.container}>
      {products.map(product => (
        <View key={product.id} style={styles.card}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Button title="Añadir al carrito" onPress={() => addToCart(product)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    marginTop: 8,
    color: 'black',
  },
});

export default ProductsScreen;
