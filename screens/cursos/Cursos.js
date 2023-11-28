import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet} from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, MD3DarkTheme, Portal, Text } from 'react-native-paper'

const Cursos = ({ navigation }) => {

  const [cursos, setCursos] = useState([])
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
    AsyncStorage.getItem('cursos').then(resultado => {
      resultado = JSON.parse(resultado) || []
      setCursos(resultado)
    })
  }

  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    cursos.splice(idExcluir, 1)
    AsyncStorage.setItem('cursos', JSON.stringify(cursos))
    carregarDados()
    setVisible(false)
  }

  return (
    <>
      <ScrollView style={{ padding: 15 }}>
  
        {cursos.map((item, i) => (
          <Card key={i} mode='outlined' style={styles.card}>
            <Card.Content>
              <Text style={styles.text}variant="titleLarge">{item.nome}</Text>
              <Text style={styles.text1} variant="bodyMedium">Duração: {item.duracao} Anos.</Text>
              <Text style={styles.text1} variant="bodyMedium">Modalidade: {item.modalidade}</Text>
            </Card.Content>
            <Card.Actions>
            <IconButton  style={{backgroundColor: '#46B070'}}
                icon='pencil-outline' 
                onPress={() => navigation.push('cursos-form', {id: i, curso: item})}
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
        onPress={() => navigation.push('cursos-form')}
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
    backgroundColor: '#C7FFF3',
    padding:15,
    
  },

  card: {
    backgroundColor: '#7BC89E',
    marginBottom: 10
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
  fundo: {
    width: '100%',
    height: '100%'
  }
  

})

export default Cursos