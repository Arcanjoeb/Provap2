import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Disciplinas from './Disciplinas';
import DisciplinasForm from './DisciplinasForm';

const Stack = createNativeStackNavigator();

const DisciplinaStack = () => {
    return (
        <>
            <Stack.Navigator initialRouteName='disciplinas'>
                <Stack.Screen name="disciplinas" component={Disciplinas} options={{ title: 'Disciplinas' }} />
                <Stack.Screen name="disciplinas-form" component={DisciplinasForm} options={{ title: 'Disciplinas' }} />
            </Stack.Navigator>
        </>
    )
}

export default DisciplinaStack