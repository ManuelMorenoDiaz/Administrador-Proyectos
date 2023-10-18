import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/styleActiveInactive';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { Platform } from 'react-native';

const InactivosProjects = () => {
  const [activeState, setActiveState] = useState({});

  const toggleAccordion = (projectName) => {
    setActiveState({
      ...activeState,
      [projectName]: !activeState[projectName],
    });
  };

  const [inactiveProjects, setInactiveProjects] = useState([]);

  // La URL de la API para obtener proyectos inactivos
  let API_URL;

  if (Platform.OS === 'web') {
    // En web, usa localhost
    API_URL = 'http://localhost:3000/api/projects/';
  } else {
    // En Android o iOS, usa 10.0.2.2 para emulador Android
    // y la dirección del servidor en producción
    API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api/projects/' : 'http://tu_direccion_de_servidor:3000/api/projects/';
  }

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

  // Filtrar solo los proyectos con estatus "Inactivo"
  const proyectosInactivos = inactiveProjects.filter(project => project.estatus === "Inactivo");

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
                    style={{ marginRight: 10 }}
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
                  <View style={styles.tarea}>
                  <View style={styles.tareaLeft}>
                    <Text style={styles.h4}>Validación del diseño de la app</Text>
                    <Text>Oscar Alfredo Diaz</Text>
                  </View>
                </View>
                <View style={styles.tarea}>
                  <View style={styles.tareaLeft}>
                    <Text style={styles.h4}>Validación del diseño de la app</Text>
                    <Text>Oscar Alfredo Diaz</Text>
                  </View>
                </View>
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
