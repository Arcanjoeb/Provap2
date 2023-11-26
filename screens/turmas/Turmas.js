import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Text } from 'react-native-paper'

const Turmas = ({ navigation }) => {

  const [Turmas, setTurmas] = useState([])
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
    AsyncStorage.getItem('Turmas').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setTurmas(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    Turmas.splice(idExcluir, 1)
    AsyncStorage.setItem('Turmas', JSON.stringify(Turmas))
    carregarDados()
    setVisible(false)
  }

  return (
    <>

      <ScrollView style={styles.scrollView}>

        {Turmas.map((item, i) => (
          <Card key={i} mode='outlined' style={styles.card}>
            <Card.Content>
              <Text style={styles.text1} variant="titleLarge">Turma: {item.turma}</Text>
              <Text style={styles.text}  variant="bodyMedium">Numero de alunos: {item.alunos}</Text>
              <Text style={styles.text}  variant="bodyMedium">Turno: {item.turno}</Text>
              <Text style={styles.text}  variant="bodyMedium">Modalidade: {item.modalidade}</Text>
            </Card.Content>
            <Card.Actions>
            <IconButton style={{backgroundColor: '#46B070'}}
                icon='pencil-outline' 
                onPress={() => navigation.push('Turmas-form', {id: i, Turmas: item})}
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
        size='medium'
        onPress={() => navigation.push('Turmas-form')}
      />

    </>
  )
}
const styles = StyleSheet.create({
  fab: { position: 'absolute', 
        right: 15,
        bottom: 20 ,
        backgroundColor: '#165411',
        
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
    fontSize:22
  },
  

})

export default Turmas