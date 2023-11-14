import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../views/HomeScreen';
import ProjectsScreen from '../views/ProjectsScreen';
import NotificationsScreen from '../views/NotificationsScreen';
import CalendarScreen from '../views/CalendarScreen';
import TaskScreen from '../views/TaskScreen';
import { ProjectProvider } from './ProjectContext';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="Tasks" component={TaskScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <ProjectProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Inicio',
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" type="font-awesome" color={'#AEAEAE'} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Projectos"
            component={HomeStack}
            options={{
              tabBarLabel: 'Projectos',
              tabBarIcon: ({ color, size }) => (
                <Icon name="folder" type="font-awesome" color={'#AEAEAE'} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              tabBarLabel: 'Notificationes',
              tabBarIcon: ({ color, size }) => (
                <Icon name="bell" type="font-awesome" color={'#AEAEAE'} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              tabBarLabel: 'Calendario',
              tabBarIcon: ({ color, size }) => (
                <Icon name="calendar" type="font-awesome" color={'#AEAEAE'} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      </ProjectProvider>
  );
}

export default Navigation;
