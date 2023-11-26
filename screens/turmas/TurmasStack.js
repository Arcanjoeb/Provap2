import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Turmas from './Turmas';
import TurmasForm from './TurmasForm';

const Stack = createNativeStackNavigator();

const TurmasStack = () => {
    return (
        <>
            <Stack.Navigator initialRouteName='Turma'>
                <Stack.Screen name="Turma" component={Turmas} options={{ title: 'Turmas' }} />
                <Stack.Screen name="Turmas-form" component={TurmasForm} options={{ title: 'Turmas' }} />
            </Stack.Navigator>
        </>
    )
}

export default TurmasStack