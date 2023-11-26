import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Professores from './Professores';
import ProfessoresForm from './ProfessoresForm';

const Stack = createNativeStackNavigator();

const ProfessoresStack = () => {
    return (
        <>
            <Stack.Navigator initialRouteName='Professore'>
                <Stack.Screen name="Professore" component={Professores} options={{ title: 'Professores' }} />
                <Stack.Screen name="Professores-form" component={ProfessoresForm} options={{ title: 'Professores' }} />
            </Stack.Navigator>
        </>
    )
}

export default ProfessoresStack