import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const name = await AsyncStorage.getItem('name');
      const photo = await AsyncStorage.getItem('photo');
      setName(name || '');
      setPhoto(photo || null);
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('photo', photo);
    navigation.navigate('Home');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tu Perfil</Text>
      <TouchableOpacity onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Añadir Foto</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="Nombre de usuario"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Guardar Perfil" onPress={saveProfile} color="#6200ea" />
        <Button title="Favoritos" onPress={() => {}} color="#6200ea" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:90,
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#6200ea',
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#6200ea',
  },
  placeholderText: {
    color: '#6200ea',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 60,
    fontSize:30,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    color: '#333333',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
