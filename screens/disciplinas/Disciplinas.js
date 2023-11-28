import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Text } from 'react-native-paper'

const Disciplinas = ({ navigation }) => {

  const [disciplinas, setDisciplinas] = useState([])
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
    AsyncStorage.getItem('disciplinas').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setDisciplinas(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    disciplinas.splice(idExcluir, 1)
    AsyncStorage.setItem('disciplinas', JSON.stringify(disciplinas))
    carregarDados()
    setVisible(false)
  }

  return (
    <>

      <ScrollView style={styles.scrollView}>

        {disciplinas.map((item, i) => (
          <Card key={i} mode='outlined' style={styles.card}>
            <Card.Content>
              <Text style={styles.text}variant="titleLarge">{item.nome}</Text>
              <Text style={styles.text1} variant="bodyMedium">Curso: {item.curso_id}</Text>
            </Card.Content>
            <Card.Actions>
            <IconButton  style={{backgroundColor: '#46B070'}}
                icon='pencil-outline' 
                onPress={() => navigation.push('disciplinas-form', {id: i, disciplina: item})}
              />
              <IconButton  style={{backgroundColor: '#FF5C5C'}}
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
        onPress={() => navigation.push('disciplinas-form')}
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
    backgroundColor: '#ffff',
  
    
  },

  card: {
    backgroundColor: '#7BC89E',
    margin:10,
    marginTop:10
    
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontSize:19
  },
  text1: {
    color: '#165411',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontSize:15
  },
  

})

export default Disciplinas