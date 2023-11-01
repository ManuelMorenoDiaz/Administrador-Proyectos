import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet } from "react-native";
import styles from "../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import CrearTarea from "./modals/CreateTask";
import EditarProyecto from "./modals/EditProject";
import Tarea from "./Task";
import Compartir from "./modals/Share";
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
  const [modalOpciones, setModalOpciones] = useState({});
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const {
    errorModalVisible, infoModalVisible, successModalVisible, questionModalVisible,
    showErrorAlert, showInfoAlert, showSuccessAlert, showQuestionAlert,
    closeErrorAlert, closeInfoAlert, closeSuccessAlert, closeQuestionAlert,
  } = useModalFunctions();

  const [activeState, setActiveState] = useState({});

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
          setProyectosActivos(response.data.filter(project => project.estatus === 'Activo'));
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        showErrorAlert();
      });
  }, []);

  useEffect(() => {
    axios.get(URLTask)
      .then (response => {
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
  // Función para mostrar/ocultar las opciones
  const mostrarMOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };
  
  const toggleModal = (projectId) => {
    setModalOpciones((prev) => ({
      ...prev,
      [projectId]: !prev[projectId] || false, 
    }));
  };
  

  // Agregar función para eliminar proyecto
  const eliminarProyecto = (projectId) => {
    toggleModal(projectId);
    axios.delete(`${URL}/${projectId}`)
      .then(response => {
        if (response.status === 200) {
          showSuccessAlert()
        }
      })
      .catch(error => {
        console.error('Error al eliminar el proyecto:', error);
        showErrorAlert();
      });
  };

  const terminarProyecto = (projectId) => {
    toggleModal(projectId);
    axios.put(`${URL}/${projectId}`, { estatus: 'Inactivo' })
      .then(response => {
        if (response.status === 200) {
          // Actualizar el estado local para reflejar el cambio
          setProyectosActivos(proyectosActivos.filter(project => project._id !== projectId));
          showSuccessAlert();
        }
      })
      .catch(error => {
        console.error('Error al terminar el proyecto:', error);
        showErrorAlert();
      });
  };

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
                      color: "white",
                      fontWeight: "bold",
                      padding: 10,
                      fontSize: 17,
                    }}
                  >
                    {project.titulo}
                  </Text>
                  <View style={styles.optionesTareasAct}>
                    <Icon
                      name={activeState[`activo${index}`] ? "chevron-up" : "chevron-down"}
                      type="font-awesome"
                      color={"white"}
                      style={{ marginRight: 10 }}
                    />
                    <Button title="=" onPress={() => toggleModal(project._id)} /> 
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <Modal
              isVisible={modalOpciones[project._id]} // Utilizamos modalOpciones[project._id] para controlar la visibilidad
              animationIn="slideInUp"
              animationOut="slideOutDown"
              backdropOpacity={0.5}
              onBackdropPress={() => toggleModal(project._id)} // Cerrar modal al presionar fuera
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
                
              }}
            >
              <View style={styles.modalOpciones}>
                <EditarProyecto idProyecto={project._id}/>
                <CrearTarea idProyecto={project._id}/>
                <Compartir />
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    
                  }}
                  onPress={() => eliminarProyecto(project._id)}
                >
                  <Icon
                    name="trash"
                    size={20}
                    style={{ marginRight: 10 }}
                    color="black"
                  />
                  <Text>Eliminar Proyecto</Text>
                </TouchableOpacity>
                <CustomAlertModal
                  isVisible={questionModalVisible}
                  type="trash"
                  message="¿Estás seguro?"
                  onClose={closeQuestionAlert}
                />
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                  onPress={() => terminarProyecto(project._id)}
                >
                  <Icon
                    name="check"
                    size={20}
                    style={{ marginRight: 10 }}
                    color="black"
                  />
                  <Text>Terminar Proyecto</Text>
                </TouchableOpacity>
                
              </View>
            </Modal>
            {activeState[`activo${index}`] && (
              <View style={styles.contenido}>
                {/* Renderizar la descripción del proyecto */}
                <View style={styles.contDescripcion}>
                  <Text style={styles.h3}>Descripción</Text>
                  <Text style={styles.p}>
                    {project.descripcion}
                  </Text>
                </View>
                {/* Renderizar las tareas por estado */}
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
        isVisible={infoModalVisible}
        type="info"
        message="El proyecto se terminará definitivamente"
        onClose={closeInfoAlert}
      />
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

