import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, ImageBackground, Image, ScrollView } from 'react-native';
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
    { id: 1, name: 'Café Americano', description: 'Delicioso café negro', price: '2.50', image: 'https://assets.beanbox.com/blog_images/AB7ud4YSE6nmOX0iGlgA.jpeg' },
    { id: 2, name: 'Capuchino', description: 'Café con leche espumosa', price: '3.50', image: 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTuDKXbkn3GeIZJJOodadOiGxwsCP6KWCRAvtBCf_eFNowUrFmuaNz7j5UrV7K7nHgr' },
    { id: 3, name: 'Croissant', description: 'Croissant recién horneado', price: '1.80', image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/7EFF9902-D260-497B-AA81-7032ED494624/Derivates/1d53fd1f-d169-469e-9ab9-7c30949bc20d.jpg' },
    { id: 4, name: 'Latte', description: 'Café con leche', price: '3.00', image: 'https://liliebakery.fr/wp-content/uploads/2023/10/Latte-macchiato-Lilie-Bakery.jpg' },
    { id: 5, name: 'Muffin', description: 'Muffin de chocolate', price: '2.00', image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/de14ea96-8907-469f-8eb2-28aee89e19da/Derivates/fb448ec3-addf-4639-94b9-d1fd0b3c43c9.jpg' },
  ];

  return (
    <ImageBackground 
      source={{ uri: 'https://www.homecoffeemachines.ie/cdn/shop/articles/coffee_beans.png?v=1648141678' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>{t.products}</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {products.length === 0 ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.emptyText}>{t.noProducts}</Text>
            </Animated.View>
          ) : (
            products.map(product => (
              <View key={product.id} style={styles.card}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <Button title={t.addToCart} onPress={() => addToCart(product)} color="#6200ea" />
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  card: {
    width: '100%',
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
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
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
    color: 'white',
    textAlign: 'center',
  },
});

export default ProductsScreen;
