import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Home from './Home'


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Homepage" component={Home} options={{ title: 'Homepage' }} />
            </Stack.Navigator>
        </>
    )
}

export default HomeStack