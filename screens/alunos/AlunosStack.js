import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Alunos from './Alunos';
import AlunosForm from './AlunosForm';

const Stack = createNativeStackNavigator();

const AlunosStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName='Alunos'>
        <Stack.Screen name="Alunos" component={Alunos} options={{ title: 'Alunos' }} />
        <Stack.Screen name="Alunos-form" component={AlunosForm} options={{ title: 'Aluno Formulario' }} />
      </Stack.Navigator>
    </>
  )
}


export default AlunosStack