import React, { useState, useEffect, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ConfigContext } from '../context/ConfigContext';
import { translations } from '../translations';

const ProfileScreen = ({ navigation }) => {
  const { language } = useContext(ConfigContext);
  const t = translations[language];
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const savedName = await AsyncStorage.getItem('name');
      const savedPhoto = await AsyncStorage.getItem('photo');
      setName(savedName || '');
      setPhoto(savedPhoto || null);
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
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t.profile}</Text>
      <TouchableOpacity onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>{t.addPhoto}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        placeholder={t.username}
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title={String(t.saveProfile)} onPress={saveProfile} color="#6200ea" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:90,
    flex: 1,
    backgroundColor: 'rgba(139,69,19,0.5)', // Fondo marrón con opacidad 0.7
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
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
    width: '80%',
    height: 40,
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
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
