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
  let baseURL;

  if (Platform.OS === 'web') {
    // En web, usa localhost
    baseURL = 'http://localhost:3000';
  } else {
    // En Android o iOS, usa 10.0.2.2 para emulador Android
    // y la dirección del servidor en producción
    baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://tu_direccion_de_servidor:3000';
  }

  const URL = `${baseURL}/api/projects`;

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

  // Filtrar solo los proyectos con estatus "Activo"
  const proyectosActivos = data.filter(project => project.estatus === "Activo");

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
                <EditarProyecto />
                <CrearTarea />
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
                  onPress={showInfoAlert}
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
                <View style={styles.contDescripcion}>
                  <Text style={styles.h3}>Descripción</Text>
                  <Text style={styles.p}>
                    {project.descripcion}
                  </Text>
                </View>
                <View style={styles.conTareas}>
                  <Text style={styles.h3}>Por Hacer</Text>
                  <Tarea />
                  <Tarea />
                  <Tarea />
                </View>
                <View style={styles.conTareas}>
                  <Text style={styles.h3}>En proceso</Text>
                  <Tarea />
                </View>
                <View style={styles.conTareas}>
                  <Text style={styles.h3}>Hecho</Text>
                  <Tarea />
                </View>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

export default Proyecto;
