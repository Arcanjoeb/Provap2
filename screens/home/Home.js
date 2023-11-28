import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const limparAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage limpo com sucesso!');
      Alert.alert('Sucesso', 'AsyncStorage foi limpo com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar AsyncStorage:', error);
      Alert.alert('Erro', 'Erro ao limpar AsyncStorage. Tente novamente.');
    }
  };

  const handleLimparAsyncStorage = () => {
    limparAsyncStorage();
    // Você pode adicionar lógica adicional aqui após a limpeza, se necessário.
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Bem-vindo ao App de Controle Escolar</Text>
      <Text style={styles.subtitle}>Para uma melhor gestão escolar</Text>
      
      <TouchableOpacity onPress={handleLimparAsyncStorage} style={styles.button}>
        <Text style={styles.buttonText}>Limpar AsyncStorage</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    margin: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#165411',
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
