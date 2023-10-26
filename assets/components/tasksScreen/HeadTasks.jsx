import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, TextInput, StyleSheet } from 'react-native';
import styles from '../../styles/styleActiveInactive';
import stylesHead from "../../styles/stylesHead";
import Modal from 'react-native-modal';
import CustomAlertModal from "../Alerts";
import { useModalFunctions } from "../Functions-Alerts"; 
import DatePicker from 'react-native-modern-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Platform } from 'react-native';
import stylesI from '../../styles/stylesI';

const HeadTasks = () => {
  const {
    errorModalVisible, infoModalVisible, successModalVisible, questionModalVisible,
    showErrorAlert, showInfoAlert, showSuccessAlert, showQuestionAlert,
    closeErrorAlert, closeInfoAlert, closeSuccessAlert, closeQuestionAlert,
  } = useModalFunctions();

  const [Modal2Visible, setModal2Visible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [dateInicio, setDateInicio] = useState('');
  const dateTextInputRefInicio = useRef();
  const dateTextInputRefFinalizacion = useRef();
  const [modalVisibleInicio, setModalVisibleInicio] = useState(false);

  let API_URL;

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

  if (Platform.OS === 'web') {
    API_URL = 'http://localhost:3000/api/tasks/';
  } else {
    API_URL =
      Platform.OS === 'android'
        ? 'http://10.0.2.2:3000/api/tasks/'
        : 'http://tu_direccion_de_servidor:3000/api/tasks/';
  }

  const guardarTarea = () => {
    const tarea = {
      titulo,
      fecha: fechaInicio,
      descripcion,
    };

    axios
      .post(API_URL, tarea)
      .then((response) => {
        if (response.status === 200) {
          console.log('Tarea creada con éxito:', response.data);
          showSuccessAlert();
          setTitulo('');
          setFechaInicio('');
          setDescripcion('');
          toggleModal2();

        }
      })
      .catch((error) => {
        console.error('Error al crear la traea:', error);
        showErrorAlert();
      });
  };

  return (
    <View style={stylesHead.headProjects}>
      <View style={stylesHead.options}>
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
            <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Crear Tarea</Text>
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
              <Text style={styles.textInput}>Fecha</Text>
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
              <Text style={styles.textInput}>Descripción</Text>
              <TextInput
                placeholder="Ingrese la descripción"
                onChangeText={(text) => {
                  setDescripcion(text);
                }}
                style={styles.input}
              />
              <Button title="Guardar" onPress={guardarTarea} />
            </View>
          </View>
        </Modal>
        <CustomAlertModal
          isVisible={successModalVisible}
          type="success"
          message="Operación exitosa."
          onClose={closeSuccessAlert}
        />
      </View>
    </View>
  );
}

export default HeadTasks;
