import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, TextInput, StyleSheet } from 'react-native';
import styles from '../styles/styleActiveInactive';
import stylesHead from '../styles/stylesHead';
import CenterProjects from '../components/projectsScreen/CenterProjects';
import ActivosProjects from '../components/projectsScreen/ActiveProjects';
import InactivosProjects from '../components/projectsScreen/InactiveProjects';
import { createStackNavigator } from '@react-navigation/stack';
import CustomAlertModal from '../components/Alerts';
import { useModalFunctions } from '../components/Functions-Alerts';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-modern-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';


const ProjectsScreen = ({ navigation }) => {
  const [Modal2Visible, setModal2Visible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinalizacion, setFechaFinalizacion] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [dateInicio, setDateInicio] = useState('');
  const [dateFinalizacion, setDateFinalizacion] = useState('');
  const dateTextInputRefInicio = useRef();
  const dateTextInputRefFinalizacion = useRef();
  const [modalVisibleInicio, setModalVisibleInicio] = useState(false);
  const [modalVisibleFinalizacion, setModalVisibleFinalizacion] = useState(false);

  const {
    errorModalVisible, infoModalVisible, successModalVisible, questionModalVisible,
    showErrorAlert, showInfoAlert, showSuccessAlert, showQuestionAlert,
    closeErrorAlert, closeInfoAlert, closeSuccessAlert, closeQuestionAlert,
  } = useModalFunctions();

  
  const toggleModal2 = () => {
    setModal2Visible(!Modal2Visible);
  };

  const openDatePickerInicio = () => {
    setModalVisibleInicio(true);
  };

  const openDatePickerFinalizacion = () => {
    setModalVisibleFinalizacion(true);
  };

  const clearDateInicio = () => {
    setDateInicio('');
    dateTextInputRefInicio.current.clear();
  };

  const clearDateFinalizacion = () => {
    setDateFinalizacion('');
    dateTextInputRefFinalizacion.current.clear();
  };

  const guardarProyecto = () => {
    // Crear el objeto del proyecto a enviar a la API
    const proyecto = {
      titulo,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFinalizacion,
      descripcion,
    };

    // Realizar la solicitud POST a la API (Asegúrate de configurar la URL correcta)
    axios
      .post('http://localhost:3000/api/projects/', proyecto)
      .then((response) => {
        if (response.status === 200) {
          // Proyecto creado con éxito, puedes agregar manejo de éxito aquí
          console.log('Proyecto creado con éxito:', response.data);
          showSuccessAlert();
          // Limpiar los campos después de la creación
          setTitulo('');
          setFechaInicio('');
          setFechaFinalizacion('');
          setDescripcion('');
          toggleModal2();
        }
      })
      .catch((error) => {
        // Manejo de errores en caso de que la creación falle
        console.error('Error al crear el proyecto:', error);
        // Puedes mostrar una alerta de error aquí
        showErrorAlert();
      });
  };



  return (
    <ScrollView>
      <View style={stylesHead.container}>
        <View style={stylesHead.headProjects}>
          <View style={stylesHead.options}>
            <TouchableOpacity style={stylesHead.button} onPress={() => navigation.navigate('Tasks')}>
              <Text style={stylesHead.buttonText}>Tareas Individuales</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesHead.addButton} onPress={toggleModal2}>
              <Text style={stylesHead.addButtonText}>+</Text>
            </TouchableOpacity>
            <Modal
              isVisible={Modal2Visible}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              backdropOpacity={0.5}
              onBackdropPress={toggleModal2}
              style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
            >
              <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
                <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Crear Proyecto</Text>
                <View style={styles.opcionesInput}>
                  <Text style={styles.textInput}>Titulo</Text>
                  <TextInput
                    placeholder="Ingrese el título"
                    onChangeText={(text) => {
                      setTitulo(text);
                    }}
                    style={styles.input}
                  />
                </View>
                <View style={styles.opcionesInput}>
                  <Text style={styles.textInput}>Fecha Inicio</Text>
                  <View style={stylesI.dateInputContainer}>
                    <TextInput
                      ref={dateTextInputRefInicio}
                      value={dateInicio}
                      style={stylesI.dateInput}
                      placeholder="Selecciona una fecha"
                    />
                    <TouchableOpacity style={stylesI.iconContainer} onPress={openDatePickerInicio}>
                      <Icon name="calendar" size={20} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesI.iconContainer} onPress={clearDateInicio}>
                      <Icon name="times" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                  <Modal
                      animationType="slide"
                      transparent={false}
                      visible={modalVisibleInicio}
                      onRequestClose={() => setModalVisibleInicio(false)}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        width: '100%',
                          height: '100%',
                      }}
                    >
                      <View
                        style={{
                          width: '80%',
                          height: '80%',
                          backgroundColor: 'red',
                          borderRadius: 10,
                          shadowColor: 'black',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                          backgroundColor: 'lightgray',
                        }}
                      >
                        <DatePicker
                          options={{
                            mainColor: '#f0f0f0',
                            textColor: 'black',
                            textHeaderColor: 'black',
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                          }}
                          onSelectedChange={(selectedDate) => {
                            setFechaInicio(selectedDate);
                            setDateInicio(selectedDate);
                            setModalVisibleInicio(false);
                          }}
                          current={dateInicio || '2023-10-10'}
                          selected={dateInicio}
                          mode="calendar"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    </View>
                  </Modal>
                </View>
                <View style={styles.opcionesInput}>
                  <Text style={styles.textInput}>Fecha Finalizacion</Text>
                  <View style={stylesI.dateInputContainer}>
                    <TextInput
                      ref={dateTextInputRefFinalizacion}
                      value={dateFinalizacion}
                      style={stylesI.dateInput}
                      placeholder="Selecciona una fecha"
                    />
                    <TouchableOpacity style={stylesI.iconContainer} onPress={openDatePickerFinalizacion}>
                      <Icon name="calendar" size={20} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesI.iconContainer} onPress={clearDateFinalizacion}>
                      <Icon name="times" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleFinalizacion}
                    onRequestClose={() => setModalVisibleFinalizacion(false)}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      <View
                        style={{
                          width: '80%',
                          backgroundColor: 'white',
                          borderRadius: 10,
                          padding: 20,
                          shadowColor: 'black',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }}
                      >
                        <DatePicker
                          options={{
                            mainColor: '#f0f0f0',
                            textColor: 'black',
                            textHeaderColor: 'black',
                            borderColor: 'rgba(122, 146, 165, 0.1)',
                          }}
                          onSelectedChange={(selectedDate) => {
                            setFechaFinalizacion(selectedDate);
                            setDateFinalizacion(selectedDate);
                            setModalVisibleFinalizacion(false);
                          }}
                          current={dateFinalizacion || '2023-10-10'}
                          selected={dateFinalizacion}
                          mode="calendar"
                        />
                      </View>
                    </View>
                  </Modal>
                </View>
                <View style={styles.opcionesInput}>
                  <Text style={styles.textInput}>Descripción</Text>
                  <TextInput
                    placeholder="Ingrese la descripción"
                    onChangeText={(text) => {
                      setDescripcion(text);
                    }}
                    style={styles.input}
                  />
                  <Button title="Guardar" onPress={guardarProyecto} />
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <CustomAlertModal
          isVisible={successModalVisible}
          type="success"
          message="Operación exitosa."
          onClose={closeSuccessAlert}
        />
        <CenterProjects />
        <ActivosProjects />
        <InactivosProjects />
      </View>
    </ScrollView>
  );
};

export default ProjectsScreen;

const stylesI = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
  dateInput: {
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
