import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import stylesHead from '../styles/stylesHead';
import { Icon } from 'react-native-elements';
import HeadTasks from '../components/tasksScreen/HeadTasks';
import CenterTasks from '../components/tasksScreen/CenterTasks';
import ActiveTasks from '../components/tasksScreen/ActiveTasks';
import InactiveTasks from '../components/tasksScreen/InactiveTasks';

const TaskScreen = () => {
  return (
    <ScrollView>
      <View style={stylesHead.container}>
        <HeadTasks />
        <CenterTasks />
        <ActiveTasks />
        <InactiveTasks />
      </View>

    </ScrollView>
  );
}

export default TaskScreen;
