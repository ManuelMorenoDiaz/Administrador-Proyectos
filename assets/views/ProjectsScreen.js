
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import styles from '../styles/stylesScreenProjects';
import { Icon } from 'react-native-elements';
import HeadProjects from '../components/projectsScreen/HeadProjects';
import CenterProjects from '../components/projectsScreen/CenterProjects';
import ActivosProjects from '../components/projectsScreen/ActiveProjects';
import InactivosProjects from '../components/projectsScreen/InactiveProjects';
 const ProjectsScreen = () => {

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeadProjects />
        <CenterProjects />
        <ActivosProjects />
        <InactivosProjects />
      </View>

    </ScrollView>
  );
};

export default ProjectsScreen;