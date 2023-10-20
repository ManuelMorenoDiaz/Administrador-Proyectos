import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import styles from "../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import CrearTarea from "./modals/CreateTask";
import EditarProyecto from "./modals/EditProject";
import Tarea from "./Task";
import Compartir from "./modals/Share";
import CustomAlertModal from "../Alerts";
import { useModalFunctions } from "../Functions-Alerts";
import axios from 'axios';
import { Platform } from 'react-native';


const Proyecto = () => {
  
  const [data, setData] = useState([]);
  const [dataTask, setDataTask] = useState([]);

  let baseURL;

  if (Platform.OS === 'web') {
    // En web, usa localhost
    baseURL = 'http://localhost:3000';
  } else {
    baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://tu_direccion_de_servidor:3000';
  }

  const URL = `${baseURL}/api/projects`;
  const URLTask = `${baseURL}/api/dependent_tasks/`;

  useEffect(() => {
    axios.get(URL)
      .then(response => {
        if (response.status === 200) {
          setData(response.data);
          console.log(response.data);
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
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });
  }, []);

  const {
    errorModalVisible, infoModalVisible, successModalVisible, questionModalVisible,
    showErrorAlert, showInfoAlert, showSuccessAlert, showQuestionAlert,
    closeErrorAlert, closeInfoAlert, closeSuccessAlert, closeQuestionAlert,
  } = useModalFunctions();

  const [activeState, setActiveState] = useState({});
  const toggleAccordion = (projectName) => {
    setActiveState({
      ...activeState,
      [projectName]: !activeState[projectName],
    });
  };

  const [modalOpciones, setModalOpciones] = useState(false);
  const mostrarMOpciones = () => {
    setModalOpciones(!modalOpciones);
  };
  

  // Agregar función para eliminar proyecto
  const eliminarProyecto = (projectId) => {
    showInfoAlert()
    axios.delete(`${URL}/${projectId}`)
      .then(response => {
        if (response.status === 200) {
          showSuccessAlert()
        }
      })
      .catch(error => {
        console.error('Error al eliminar el proyecto:', error);
      });
  };


  const terminarProyecto = (projectId) => {
    showQuestionAlert();
    axios.put(`${URL}/${projectId}`, { estatus: "Inactivo" }) // Realiza una solicitud PUT al servidor para actualizar el estado del proyecto
      .then(response => {
        if (response.status === 200) {
          // Actualiza el estado localmente para reflejar el cambio
          const proyectoIndex = proyectosActivos.findIndex(project => project._id === projectId);
          if (proyectoIndex !== -1) {
            proyectosActivos[proyectoIndex].estatus = "Inactivo";
          }
          showSuccessAlert();
        }
      })
      .catch(error => {
        console.error('Error al terminar el proyecto:', error);
      });
  };

  // Organizar las tareas por proyecto y estado
  const proyectosActivos = data.filter(project => project.estatus === "Activo");

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
                {/* Renderizar el título del proyecto */}
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
                    <Button title="=" onPress={mostrarMOpciones} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <Modal
              isVisible={modalOpciones}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              backdropOpacity={0.5}
              onBackdropPress={mostrarMOpciones}
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
                    border: "2px solid red",
                  }}
                  onPress={() => eliminarProyecto(project._id)}
                >
                  <Icon
                    name="delete"
                    size={20}
                    style={{ marginRight: 10 }}
                    color="black"
                  />
                  <Text>Eliminar Proyecto</Text>
                </TouchableOpacity>
                <CustomAlertModal
                  isVisible={questionModalVisible}
                  type="question"
                  message="¿Estás seguro?"
                  onClose={closeQuestionAlert}
                />
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    border: "2px solid red",
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
                <CustomAlertModal
                  isVisible={infoModalVisible}
                  type="info"
                  message="El proyecto se terminará definitivamente"
                  onClose={closeInfoAlert}
                />
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
    </View>
  );
}

export default Proyecto;