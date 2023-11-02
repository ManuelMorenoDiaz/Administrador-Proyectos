
import React, { useState } from 'react';
import { View, Text } from "react-native";
import styles from "../../styles/styleActiveInactive";

const Tarea = (props) => {
  const [titulo] = useState(props.task.titulo || '');

  return (
    <View style={styles.tarea}>
      <View style={styles.tareaLeft}>
        <Text style={styles.h4}>
          {titulo}
        </Text>
        <Text>Oscar Alfredo Diaz</Text>

      </View>
    </View>
  );
}

export default Tarea;

