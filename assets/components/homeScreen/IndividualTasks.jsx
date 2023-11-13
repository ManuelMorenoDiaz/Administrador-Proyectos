
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/styleActiveInactive';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useModalFunctions } from '../Functions-Alerts';
import axios from 'axios';
import { Platform } from 'react-native';
import CustomAlertModal from '../Alerts'
const IndividualTasks = () => {
  const {
    errorModalVisible, successModalVisible,
    showErrorAlert, showSuccessAlert,
    closeErrorAlert, closeSuccessAlert,
  } = useModalFunctions();

  const [activeState, setActiveState] = useState({});
  const [activeTasks, setActiveTasks] = useState([]);
  const [modalOpciones, setModalOpciones] = useState({});

  const tareasActivas = activeTasks.filter((task) => task.estatus === 'Activo' || task.estatus === 'Terminado');

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
    const fetchActiveTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setActiveTasks(response.data);
      } catch (error) {
        console.error('Error al obtener tareas activas:', error);
      }
    };

    fetchActiveTasks();
  }, []);

  const toggleAccordion = (taskId) => {
    setActiveState((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const toggleModal = (taskId) => {
    setModalOpciones((prev) => ({
      ...prev,
      [taskId]: !prev[taskId] || false,
    }));
  };

  return (
    <View style={styles.activos}>
      <Text style={styles.title}>Tareas Individuales</Text>
      {tareasActivas.map((task, index) => (
        <View style={styles.acordeon} key={task._id}>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => toggleAccordion(task._id)}>
              <View style={styles.flexRow}>
                <View style={[styles.activosTareas, styles.colorAT]}>
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
                    <Text>{task.titulo}</Text> <Text>{task.estatus}</Text>
                  </Text>
                  <View style={styles.optionesTareasAct} >
                    <Icon
                      name={activeState[task._id] ? 'chevron-up' : 'chevron-down'}
                      type="font-awesome"
                      color={'white'}
                      style={{ marginRight: 10, paddingRight:20 }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {activeState[task._id] && (
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
};

export default IndividualTasks;
