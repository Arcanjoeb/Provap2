import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Bem-vindo ao App de Controle Escolar</Text>
      <Text style={styles.subtitle}>Para uma melhor gestão escolar</Text>
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
});

export default Home;
