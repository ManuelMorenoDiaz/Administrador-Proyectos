import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, Platform } from 'react-native';
import stylesHead from '../../styles/stylesHead';
import styles from '../../styles/styleActiveInactive';
import stylesI from '../../styles/stylesI';
import CustomAlertModal from '../Alerts';
import { useModalFunctions } from '../Functions-Alerts';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-modern-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const CreateProject = (props) => {
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
    successModalVisible,
    showSuccessAlert,
    closeSuccessAlert,
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

  let baseURL;

  if (Platform.OS === 'web') {
    baseURL = 'http://localhost:3000';
  } else {
    baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://tu_direccion_de_servidor:3000';
  }

  const URL = `${baseURL}/api/projects`;

  const guardarProyecto = () => {
    // Crear el objeto del proyecto a enviar a la API
    const proyecto = {
      titulo,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFinalizacion,
      descripcion,
    };

    axios
      .post(URL, proyecto)
      .then((response) => {
        if (response.status === 200) {
          // Proyecto creado con éxito, puedes agregar manejo de éxito aquí
          console.log('Proyecto creado con éxito:', response.data);
          showSuccessAlert();
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
    <View >
      <View style={stylesHead.headProjects}>
        <View style={stylesHead.options}>
          <TouchableOpacity style={[stylesHead.addButton,{borderRadius:props.radio}]} onPress={toggleModal2}>
            <Text style={stylesHead.addButtonText}>{props.nom}</Text>
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
                        height: 'auto',
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
                          height: 'auto',
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
                        height: 'auto',
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
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 10,
                        }}
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
    </View>
  );
};

export default CreateProject;
