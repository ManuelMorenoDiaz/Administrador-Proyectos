import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/styleActiveInactive';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { Platform } from 'react-native';

const InactivosProjects = () => {
  const [activeState, setActiveState] = useState({});
  const [dataTask, setDataTask] = useState([]);
  const [inactiveProjects, setInactiveProjects] = useState([]);

  let baseURL;

  if (Platform.OS === 'web') {
    baseURL = 'http://localhost:3000';
  } else {
    baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://tu_direccion_de_servidor:3000';
  }
  const API_URL = `${baseURL}/api/projects`;
  const URLTask = `${baseURL}/api/dependent_tasks`;

    // Filtrar solo los proyectos con estatus "Inactivo"
    const proyectosInactivos = inactiveProjects.filter(project => project.estatus === "Inactivo");

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        if (response.status === 200) {
          setInactiveProjects(response.data);
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(URLTask)
      .then(response => {
        if (response.status === 200) {
          setDataTask(response.data);
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        showErrorAlert();
      });
  }, []);


  const toggleAccordion = (projectName) => {
    setActiveState({
      ...activeState,
      [projectName]: !activeState[projectName],
    });
  };

  return (
    <View style={styles.inactivos}>
      <Text style={styles.title}>Inactivos</Text>
      {proyectosInactivos.map((project, index) => (
        <View style={styles.acordeon} key={project._id}>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => toggleAccordion(`inactivos${index}`)}>
              <View style={styles.flexRow}>
                <View style={[styles.inactivosTareas]}>
                  <Text style={{ color: 'white', fontWeight: 'bold', padding: 10, fontSize: 17 }}>
                    {project.titulo}
                  </Text>
                  <Icon
                    name={activeState[`inactivos${index}`] ? 'chevron-up' : 'chevron-down'}
                    type="font-awesome"
                    color={'white'}
                    style={{ marginRight: 10}}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {activeState[`inactivos${index}`] && (
              <View style={styles.contenido}>
                <View style={styles.contDescripcion}>
                  <Text style={styles.h3}>Descripción</Text>
                  <Text style={styles.p}>
                    {project.descripcion}
                  </Text>
                </View>
                <View style={styles.conTareas}>
                  <Text style={styles.h3}>Tareas</Text>
                  {dataTask
                    .filter(task => task.proyecto_id === project._id)
                    .map((task, taskIndex) => (
                      <View style={styles.tarea} key={taskIndex}>
                        <View style={styles.tareaLeft}>
                          <Text style={styles.h4}>{task.titulo}</Text>
                          <Text>{task.titulo}</Text>
                        </View>
                      </View>
                    ))}
                </View>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default InactivosProjects;
