import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import Tarea from "./Task";
import CustomAlertModal from "../Alerts";
import { useModalFunctions } from "../Functions-Alerts";
import axios from 'axios';
import { Platform } from 'react-native';
import { useProject } from '../ProjectContext'

const Proyecto = () => {
  const { projects } = useProject();
  const [data, setData] = useState([]);
  const [dataTask, setDataTask] = useState([]);
  const [proyectosActivos, setProyectosActivos] = useState([]); 
  const [activeState, setActiveState] = useState({});
  const [modalOpciones, setModalOpciones] = useState({});

  const {
    errorModalVisible, successModalVisible,
    showErrorAlert, showSuccessAlert,
    closeErrorAlert, closeSuccessAlert,
  } = useModalFunctions();

  let baseURL;
  if (Platform.OS === 'web') {
    baseURL = 'http://localhost:3000';
  } else {
    baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://tu_direccion_de_servidor:3000';
  }

  const URL = `${baseURL}/api/projects`;
  const URLTask = `${baseURL}/api/dependent_tasks`;

  useEffect(() => {
    axios.get(URL)
      .then(response => {
        if (response.status === 200) {
          setData(response.data);
          setProyectosActivos(response.data.filter(project => project.estatus === 'Activo' || project.estatus === 'Inactivo'));
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        showErrorAlert();
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
  }

  const tareasPorProyecto = {};
  proyectosActivos.forEach(project => {
    if (!tareasPorProyecto[project._id]) {
      tareasPorProyecto[project._id] = {
        projectData: project,
        tareas: {
          "Por hacer": [],
          "En progreso": [],
          "Hecho": [],
        },
      };
    }
  });

  dataTask.forEach(task => {
    const proyectoId = task.proyecto_id;
    const estado = task.estatus;
    if (tareasPorProyecto[proyectoId] && tareasPorProyecto[proyectoId].tareas[estado]) {
      tareasPorProyecto[proyectoId].tareas[estado].push(task);
    }
  });

  return (
    <View>
      {proyectosActivos.map((project, index) => (
        <View style={styles.item} key={project._id}>
          <View>
            <TouchableOpacity onPress={() => toggleAccordion(`activo${index}`)}>
              <View style={styles.flexRow}>
                <View style={[styles.activosTareas, styles.colorAP]}>
                <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      padding: 10,
                      fontSize: 17,
                      display: 'flex',
                      justifyContent:'space-between',
                      width:'100%'
                    }}
                  >
                    <Text>{project.titulo}</Text> <Text>{project.estatus}</Text>
                  </Text>
                  <View style={styles.optionesTareasAct}>
                    <Icon
                      name={activeState[`activo${index}`] ? "chevron-up" : "chevron-down"}
                      type="font-awesome"
                      color={"white"}
                      style={{ marginRight: 10 }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {activeState[`activo${index}`] && (
              <View style={styles.contenido}>
                <View style={styles.contDescripcion}>
                  <Text style={styles.h3}>Descripción</Text>
                  <Text style={styles.p}>
                    {project.descripcion}
                  </Text>
                </View>
                {Object.entries(tareasPorProyecto[project._id].tareas).map(([estado, tareas]) => (
                  <View key={estado} style={styles.conTareas}>
                    <Text style={styles.h3}>{estado}</Text>
                    {tareas.map(task => (
                      <Tarea key={task._id} task={task} />
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      ))}
      <CustomAlertModal
        isVisible={errorModalVisible}
        type="error"
        message="Ocurrió un error."
        onClose={closeErrorAlert}
      />
      <CustomAlertModal
        isVisible={successModalVisible}
        type="success"
        message="Operación exitosa."
        onClose={closeSuccessAlert}
      />
    </View>
  );
}

export default Proyecto;
