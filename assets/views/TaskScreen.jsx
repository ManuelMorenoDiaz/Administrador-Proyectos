import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import stylesHead from '../styles/stylesHead';
import HeadTasks from '../components/tasksScreen/HeadTasks';
import Center from '../components/Center'
import ActiveTasks from '../components/tasksScreen/ActiveTasks';
import InactiveTasks from '../components/tasksScreen/InactiveTasks';


const TaskScreen = () => {
  return (
    <ScrollView>
      <View style={stylesHead.container}>
        <HeadTasks nom='+' radio={100}/>
        <Center color1='#B781FB' color2='#F2841E' num1='1' num2='1' nam1='Activas' nam2='Inactivas'/>
        <ActiveTasks />
        <InactiveTasks />
      </View>

    </ScrollView>
  );
}

export default TaskScreen;
