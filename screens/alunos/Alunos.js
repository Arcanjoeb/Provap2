import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import react, { useState } from 'react'
import { ScrollView, StyleSheet} from 'react-native'
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper'


const Alunos = ({navigation}) => {

    const [Aluno, setAluno] = useState([])
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
      AsyncStorage.getItem('Aluno').then(resultado => {
        resultado = JSON.parse(resultado) || []
        setAluno(resultado)
      })
    }
  
    function confirmarExclusao(id) {
      setIdExcluir(id)
      setVisible(true)
    }
  
    function excluir() {
      setAluno(prevAlunos => {
        const updatedAlunos = [...prevAlunos];
        updatedAlunos.splice(idExcluir, 1);
        return updatedAlunos;
      });
    
      AsyncStorage.setItem('alunos', JSON.stringify(Aluno));
      carregarDados();
      setVisible(false);
    }
  return (

    <>


<ScrollView style={styles.scrollView}>

{Aluno.map((item, i) => (
  <Card key={i} mode='outlined' style={styles.card}>
    <Card.Content>
      <Text style={styles.text}variant="titleLarge">{item.nome}</Text>
      <Text style={styles.text1} variant="bodyMedium">Cpf: {item.cpf}</Text>
      <Text style={styles.text1} variant="bodyMedium">Matricula: {item.matricula}</Text>
      <Text style={styles.text1} variant="bodyMedium">Email: {item.email}</Text>
      <Text style={styles.text1} variant="bodyMedium">Telefone: {item.telefone}</Text>
      <Text style={styles.text1} variant="bodyMedium">Cep: {item.cep}</Text>
      <Text style={styles.text1} variant="bodyMedium">Rua: {item.rua}</Text>
      <Text style={styles.text1} variant="bodyMedium">Bairro: {item.bairro}</Text>
      <Text style={styles.text1} variant="bodyMedium">Cidade: {item.cidade}</Text>
      <Text style={styles.text1} variant="bodyMedium">UF: {item.uf}</Text>
    </Card.Content>
    <Card.Actions>
    <IconButton  style={{backgroundColor: '#46B070'}}
        icon='pencil-outline' 
        onPress={() => navigation.push('Alunos-form', {id: i, Aluno: item})}
      />
      <IconButton  style={{backgroundColor: '#FF5C5C'}}
        icon='trash-can-outline'
        onPress={() => confirmarExclusao(i)}
      />
    </Card.Actions>
  </Card>
))}

</ScrollView>

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
    
    <FAB styles={styles.fab}
            icon='plus' 
            size='small'
            style={{ position: 'absolute', right: 15,bottom: 15, backgroundColor: '#7BC89E',}}
            onPress={()=>navigation.push('Alunos-form')}>
        </FAB>
    </>
  

  )}
  
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    // padding:15,
    
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
  

})

export default Alunos