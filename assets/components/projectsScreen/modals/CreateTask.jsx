import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet  } from "react-native";
import styles from "../../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import CustomAlertModal from '../../Alerts';
import { useModalFunctions } from '../../Functions-Alerts';
import DatePicker from 'react-native-modern-datepicker';
import axios from 'axios';
import { Icon } from "react-native-elements";

const CrearTarea = (props) => {
  const proyectoId = props.idProyecto;
  const [modalCrearTarea, setModalCrearTarea] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [dateInicio, setDateInicio] = useState('');
  const dateTextInputRefInicio = useRef();
  const [modalVisibleInicio, setModalVisibleInicio] = useState(false);
  
  const {
    errorModalVisible, infoModalVisible, successModalVisible, questionModalVisible,
    showErrorAlert, showInfoAlert, showSuccessAlert, showQuestionAlert,
    closeErrorAlert, closeInfoAlert, closeSuccessAlert, closeQuestionAlert,
  } = useModalFunctions();


  const mostrarMCrearTarea = () => {
    setModalCrearTarea(!modalCrearTarea);
  };

  const openDatePickerInicio = () => {
    setModalVisibleInicio(true);
  };

  const clearDateInicio = () => {
    setDateInicio('');
    dateTextInputRefInicio.current.clear();
  };

  const crearTarea = () => {
    const tarea = {
        proyecto_id:proyectoId,
        titulo,
        fecha: fechaInicio,
        descripcion,
        estatus:'Por hacer'
      };

      // Realizar la solicitud POST a la API (Asegúrate de configurar la URL correcta)
    axios
    .post('http://localhost:3000/api/dependent_tasks/', tarea)
    .then((response) => {
      if (response.status === 200) {
        // Proyecto creado con éxito, puedes agregar manejo de éxito aquí
        console.log('Tarea creada con éxito:', response.data);
        showSuccessAlert();
        // Limpiar los campos después de la creación
        setTitulo('');
        setFechaInicio('');
        setDescripcion('');
        modalCrearTarea();
      }
    })
    .catch((error) => {
      // Manejo de errores en caso de que la creación falle
      console.error('Error al crear la tarea:', error);
      // Puedes mostrar una alerta de error aquí
      showErrorAlert();
    });

  };

  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
      }}
      onPress={mostrarMCrearTarea}
    >
      <Icon
        name="book"
        size={20}
        style={{ marginRight: 10 }}
        color="black"
      />
      <Text>Crear Tarea</Text>
      <Modal
        isVisible={modalCrearTarea}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        onBackdropPress={mostrarMCrearTarea}
        style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
      >
        <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
          <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Crear Tarea</Text>
          <View style={styles.opcionesInput}>
            <Text style={styles.textInput}>Titulo</Text>
            <TextInput
              placeholder="Ingrese el título"
              value={titulo}
              onChangeText={(text) => setTitulo(text)}
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
            <Text style={styles.textInput}>Descripción</Text>
            <TextInput
              placeholder="Ingrese la descripción"
              value={descripcion}
              onChangeText={(text) => setDescripcion(text)}
              style={styles.input}
            />
            <Button
              title="Guardar"
              onPress={() => {
                crearTarea();
                mostrarMCrearTarea();
              }}
            />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

export default CrearTarea;


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
  