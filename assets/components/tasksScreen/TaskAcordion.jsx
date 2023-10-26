import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import styles from "../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import EditarProyecto from "./modals/EditTask";
import Compartir from "./modals/Share";
import CustomAlertModal from "../Alerts";
import { useModalFunctions } from "../Functions-Alerts"; 
import axios from 'axios';
import { Platform } from 'react-native';

const Task = () => {
    const {
        errorModalVisible, infoModalVisible,successModalVisible,questionModalVisible,
        showErrorAlert, showInfoAlert, showSuccessAlert,showQuestionAlert,
        closeErrorAlert, closeInfoAlert, closeSuccessAlert,closeQuestionAlert,
    } = useModalFunctions();

    const [activeState, setActiveState] = useState({});
    const [activeTasks, setActiveTasks] = useState([]);
    const [modalOpciones, setModalOpciones] = useState(false);
    const proyectosActivos = activeTasks.filter((task) => task.estatus === 'Activo');

  const toggleAccordion = (taskName) => {
    setActiveState({
      ...activeState,
      [taskName]: !activeState[taskName],
    });
  };

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

    const mostrarMOpciones = () => {
        setModalOpciones(!modalOpciones);
    };

    return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => toggleAccordion("activo1")}>
                    <View style={styles.flexRow}>
                        <View style={[styles.activosTareas, , styles.colorAT]}>
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    padding: 10,
                                    fontSize: 17,
                                }}
                            >
                                Creación de una app similar a Notion 1
                            </Text>
                            <View style={styles.optionesTareasAct}>
                                <Icon
                                    name={activeState.activo1 ? "chevron-up" : "chevron-down"}
                                    type="font-awesome"
                                    color={"white"}
                                    style={{ marginRight: 10 }}
                                />
                                <Button title="=" onPress={mostrarMOpciones} />
                            </View>
                        </View>
                    </View>
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
                            <Compartir />
                            <TouchableOpacity
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    border: "2px solid red",
                                }}
                                onPress={showQuestionAlert}

                            >
                                <Icon
                                    name="delete"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                    color="black"
                                />
                                <Text>Eliminar Tarea</Text>
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
                                <Text>Terminar Tarea</Text>
                            </TouchableOpacity>
                            <CustomAlertModal
                                isVisible={infoModalVisible}
                                type="info"
                                message="La Tarea se terminara definitivamente"
                                onClose={closeInfoAlert}
                            />
                        </View>
                    </Modal>
                </TouchableOpacity>

                {activeState.activo1 && (
                    <View style={styles.contenido}>
                        <View style={styles.contDescripcion}>
                            <Text style={styles.h3}>Descripción</Text>
                            <Text style={styles.p}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Ducimus quos commodi neque quod dicta mollitia facere ipsa
                                fuga natus perferendis corporis doloremque veritatis, iure
                                reiciendis eius eveniet doloribus, beatae soluta!
                            </Text>
                        </View>
                    </View>
                )}
            </View>
    );
}

export default Task;