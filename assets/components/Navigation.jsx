import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../views/HomeScreen';
import ProjectsScreen from '../views/ProjectsScreen';
import NotificationsScreen from '../views/NotificationsScreen';
import CalendarScreen from '../views/CalendarScreen';
import { Icon } from 'react-native-elements';
const Tab = createMaterialBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" type="font-awesome" color={'#AEAEAE'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsScreen}
          options={{
            tabBarLabel: 'Projects',
            tabBarIcon: ({ color, size }) => (
              <Icon name="folder" type="font-awesome" color={'#AEAEAE'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({ color, size }) => (
              <Icon name="bell" type="font-awesome" color={'#AEAEAE'} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" type="font-awesome" color={'#AEAEAE'} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
