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
    questionModalVisible,
    showQuestionAlert,
    closeQuestionAlert,
    showInfoAlert,
    showSuccessAlert,
  } = useModalFunctions();

  const [activeState, setActiveState] = useState({});
  const [activeTasks, setActiveTasks] = useState([]);
  const [modalOpciones, setModalOpciones] = useState(false);

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
    // Función para obtener las tareas activas
    const fetchActiveTasks = async () => {
      try {
        const response = await axios.get(API_URL); // Reemplaza con la URL correcta
        setActiveTasks(response.data);
      } catch (error) {
        console.error('Error al obtener tareas activas:', error);
      }
    };

    fetchActiveTasks();
  }, []);


  const toggleAccordion = (taskName) => {
    setActiveState({
      ...activeState,
      [taskName]: !activeState[taskName],
    });
  };

  // Agregar función para eliminar tarea
  const eliminarTarea = (taskId) => {
    showInfoAlert();
    axios
      .delete(`${API_URL}${taskId}`)
      .then((response) => {
        if (response.status === 200) {
          // Actualiza la lista de tareas después de eliminar
          setActiveTasks(activeTasks.filter((task) => task._id !== taskId));
          showSuccessAlert();
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la tarea:', error);
      });
  };

  const terminarTarea = (taskId) => {
    showQuestionAlert();
    axios
      .put(`${API_URL}${taskId}`, { estatus: 'Terminado' })
      .then((response) => {
        if (response.status === 200) {
          // Actualiza la lista de tareas después de marcar como terminada
          setActiveTasks(activeTasks.filter((task) => task._id !== taskId));
          showSuccessAlert();
        }
      })
      .catch((error) => {
        console.error('Error al terminar la tarea:', error);
      });
  };

  const tareasActivas = activeTasks.filter((task) => task.estatus === 'Activo');
  return (
    <View style={styles.activos}>
      <Text style={styles.title}>Activos</Text>
      {tareasActivas.map((task, index) => (
        <View style={styles.acordeon} key={task._id}>
          <View style={styles.item}>
            <TouchableOpacity onPress={() => toggleAccordion(`activos${index}`)}>
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
                      name={activeState[`activos${index}`] ? 'chevron-up' : 'chevron-down'}
                      type="font-awesome"
                      color={'white'}
                      style={{ marginRight: 10 }}
                    />
                    <Button title="=" onPress={() => setModalOpciones(true)} />
                  </View>
                </View>
              </View>
              <Modal
                isVisible={modalOpciones}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={() => setModalOpciones(false)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                <View style={styles.modalOpciones}>
                  <EditarTarea />
                  <Compartir />
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
                  <CustomAlertModal
                    isVisible={questionModalVisible}
                    type="question"
                    message="¿Estás seguro?"
                    onClose={closeQuestionAlert}
                  />
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
            {activeState[`activos${index}`] && (
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

export default ActiveTasks;
