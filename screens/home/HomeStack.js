import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Home from './Home'


const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            </Stack.Navigator>
        </>
    )
}

export default HomeStack