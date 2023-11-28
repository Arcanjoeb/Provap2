import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Text } from 'react-native-paper'

const Professores = ({ navigation }) => {

  const [Professores, setProfessores] = useState([])
  const [idExcluir, setIdExcluir] = useState(0)

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados()
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('Professores').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setProfessores(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    Professores.splice(idExcluir, 1)
    AsyncStorage.setItem('Professores', JSON.stringify(Professores))
    carregarDados()
    setVisible(false)
  }

  return (
    <>

      <ScrollView style={styles.scrollView}>

        {Professores.map((item, i) => (
          <Card  key={i} mode='outlined' style={styles.card}>  
            <Card.Content >
              <Text style={styles.text1} variant="titleLarge">{item.nome}</Text>
              <Text style={styles.text} variant="bodyMedium">CPF: {item.cpf}</Text>
              <Text style={styles.text} variant="bodyMedium">Matricula: {item.matricula}</Text>
              <Text style={styles.text} variant="bodyMedium">Modalidade: {item.modalidade}</Text>
            </Card.Content>
            <Card.Actions >
              <IconButton  style={{backgroundColor: '#46B070'}}
                icon='pencil-outline' 
                onPress={() => navigation.push('Professores-form', {id: i, Professor: item})}
              />
              <IconButton style={{backgroundColor: '#FF5C5C'}}
                icon='trash-can-outline'
                onPress={() => confirmarExclusao(i)}
              />
            </Card.Actions>
          </Card>
        ))}

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">Deseja realmente excluir o registro?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={excluir}>Sim</Button>
              <Button onPress={hideDialog}>Não</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </ScrollView>

      <FAB style={styles.fab}
        icon="plus"
        size='small'
        onPress={() => navigation.push('Professores-form')}
      />

    </>
  )
}

const styles = StyleSheet.create({
  fab: { position: 'absolute', 
        right: 15,
        bottom: 20 ,
        backgroundColor: '#7BC89E',
        
      },

  scrollView: {
    backgroundColor: '#fff',
    padding:15,
    
  },

  card: {
    backgroundColor: '#7BC89E',
    marginBottom: 10
  },
  text: {
    color: '#165411',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontSize:12.5
  },
  text1: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontSize:25
  },
  

})
export default Professores
