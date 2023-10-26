import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import styles from '../../styles/styleActiveInactive';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditarTarea from './modals/EditTask';
import Compartir from './modals/Share';
import CustomAlertModal from '../Alerts';
import { useModalFunctions } from '../Functions-Alerts';
import axios from 'axios';
import { Platform } from 'react-native';

const ActiveTasks = () => {
  const {
    errorModalVisible, infoModalVisible, successModalVisible, questionModalVisible,
    showErrorAlert, showInfoAlert, showSuccessAlert, showQuestionAlert,
    closeErrorAlert, closeInfoAlert, closeSuccessAlert, closeQuestionAlert,
  } = useModalFunctions();


  const [activeState, setActiveState] = useState({});
  const [activeTasks, setActiveTasks] = useState([]);
  const [modalOpciones, setModalOpciones] = useState({});

  const tareasActivas = activeTasks.filter((task) => task.estatus === 'Activo');

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

  const eliminarTarea = (taskId) => {
    toggleModal(taskId);
    axios
      .delete(`${API_URL}${taskId}`)
      .then((response) => {
        if (response.status === 200) {
          setActiveTasks((tasks) => tasks.filter((task) => task._id !== taskId));
          showSuccessAlert();
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la tarea:', error);
        showErrorAlert();
      });
  };

  const terminarTarea = (taskId) => {
    toggleModal(taskId);
    axios
      .put(`${API_URL}${taskId}`, { estatus: 'Terminado' })
      .then((response) => {
        if (response.status === 200) {
          setActiveTasks((tasks) => tasks.filter((task) => task._id !== taskId));
          showSuccessAlert();
        }
      })
      .catch((error) => {
        console.error('Error al terminar la tarea:', error);
        showErrorAlert();
      });
  };

  return (
    <View style={styles.activos}>
      <Text style={styles.title}>Activos</Text>
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
                    }}
                  >
                    {task.titulo}
                  </Text>
                  <View style={styles.optionesTareasAct}>
                    <Icon
                      name={activeState[task._id] ? 'chevron-up' : 'chevron-down'}
                      type="font-awesome"
                      color={'white'}
                      style={{ marginRight: 10 }}
                    />
                    <Button title="=" onPress={() => toggleModal(task._id)} />
                  </View>
                </View>
              </View>
              <Modal
                isVisible={modalOpciones[task._id]}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={() => toggleModal(task._id)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                <View style={styles.modalOpciones}>
                  <EditarTarea idTarea={task._id} />
                  <Compartir idTarea={task._id} />
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                      alignItems: 'center',
                    }}
                    onPress={() => eliminarTarea(task._id)}
                  >
                    <Icon name="trash" size={20} style={{ marginRight: 10 }} color="black" />
                    <Text>Eliminar Tarea</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                      alignItems: 'center',
                    }}
                    onPress={() => terminarTarea(task._id)}
                  >
                    <Icon name="check" size={20} style={{ marginRight: 10 }} color="black" />
                    <Text>Terminar Tarea</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
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

export default ActiveTasks;
