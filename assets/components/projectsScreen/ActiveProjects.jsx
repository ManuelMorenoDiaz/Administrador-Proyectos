import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/styleActiveInactive';
import Proyecto from './Project';

const ActivosProjects = () => {
  return (
    <View style={styles.activos}>
      <Text style={styles.title}>Activos</Text>
        <View style={styles.acordeon} >
          <Proyecto/>
        </View>
    </View>
  );
};

export default ActivosProjects;
