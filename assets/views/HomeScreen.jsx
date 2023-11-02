import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Center from '../components/Center';
import IndividualTasks from '../components/homeScreen/IndividualTasks';
import ActiveProjectsH from '../components/homeScreen/ActiveProjectsH';

const HomeScreen = () => {
    return (
      <ScrollView>
        <Center tp={true} color1='#1ABCFE' color2='#B781FB' num1='1' num2='1' nam1='Proyectos' nam2='Tareas Individuales'/>
        <ActiveProjectsH />
        <IndividualTasks />
      </ScrollView>
    );
  };

export default HomeScreen;