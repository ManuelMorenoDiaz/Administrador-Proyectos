import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/styleActiveInactive';
import Proyecto from './Project';

const ActivosProjectsH = () => {
  return (
    <View style={styles.activos}>
      <Text style={styles.title}>Proyectos</Text>
        <View style={styles.acordeon} >
          <Proyecto/>
        </View>
    </View>
  );
};

export default ActivosProjectsH;
