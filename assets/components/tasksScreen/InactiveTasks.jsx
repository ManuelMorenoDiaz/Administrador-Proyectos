import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { Platform } from 'react-native';
import styles from '../../styles/styleActiveInactive';

const InactiveTasks = () => {
  const [activeState, setActiveState] = useState({});

  const toggleAccordion = (taskName) => {
    setActiveState({
      ...activeState,
      [taskName]: !activeState[taskName],
    });
  };

  const [inactiveTasks, setInactiveTasks] = useState([]);

  const proyectosInactivos = inactiveTasks.filter((task) => task.estatus === 'Terminado');

  let API_URL;

  if (Platform.OS === 'web') {
    API_URL = 'http://localhost:3000/api/tasks/';
  } else {
    API_URL =
      Platform.OS === 'android'
        ? 'http://10.0.2.2:3000/api/tasks/'
        : 'http://tu_direccion_de_servidor:3000/api/tasks/';
  }

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (response.status === 200) {
          setInactiveTasks(response.data);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error.message);
      });
  }, []);

  return (
    <View style={styles.inactivos}>
      <Text style={styles.title}>Inactivos</Text>
      {proyectosInactivos.map((task, index) => (
        <View style={styles.acordeon} key={task._id}>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => toggleAccordion(`inactivos${index}`)}>
              <View style={styles.flexRow}>
                <View style={styles.inactivosTareas}>
                  <Text style={{ color: 'white', fontWeight: 'bold', padding: 10, fontSize: 17 }}>
                    {task.titulo}
                  </Text>
                  <Icon
                    name={activeState[`inactivos${index}`] ? 'chevron-up' : 'chevron-down'}
                    type="font-awesome"
                    color={'white'}
                    style={{ marginRight: 10 }}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {activeState[`inactivos${index}`] && (
              <View style={styles.contenido}>
                <View style={styles.contDescripcion}>
                  <Text style={styles.h3}>Descripción</Text>
                  <Text style={styles.p}>{task.descripcion}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default InactiveTasks;
