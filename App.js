import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CursoStack from './screens/cursos/CursoStack';
import AlunosStack from './screens/alunos/AlunosStack';
import DisciplinaStack from './screens/disciplinas/DisciplinasStack';
import ProfessoresStack from './screens/professores/ProfessoresStack';
import TurmasStack from './screens/turmas/TurmasStack';
import { StyleSheet } from 'react-native';
import HomeStack from './screens/home/HomeStack';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <PaperProvider  >
        <NavigationContainer styles={styles.Paper} >
          <Tab.Navigator initialRouteName='Home'>
            
            <Tab.Screen
              name="Cursos" 
              component={CursoStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="bookshelf" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Disciplinas" 
              component={DisciplinaStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="book-open-variant" size={26} />
                ),
              }}
            />
            
            <Tab.Screen
              name="Perfil Alunos" 
              component={AlunosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="human-handsup" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Home" 
              component={HomeStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="home-circle" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Professores" 
              component={ProfessoresStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account-tie" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Turmas" 
              component={TurmasStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="google-classroom" size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
const styles = StyleSheet.create({
  Paper: { backgroundColor: '#7FFA09',
      },

})

