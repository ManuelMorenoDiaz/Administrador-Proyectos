import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet } from "react-native";
import styles from "../../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomAlertModal from '../../Alerts';
import { useModalFunctions } from '../../Functions-Alerts';
import DatePicker from 'react-native-modern-datepicker';
import axios from 'axios';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Cambiado el nombre para evitar conflictos de nombres
import { Platform } from 'react-native';
import stylesI from '../../../styles/stylesI';

const EditarTarea = (props) => {

  const [titulo, setTitulo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [dateInicio, setDateInicio] = useState('');
  const [modalVisibleInicio, setModalVisibleInicio] = useState(false);
  const dateTextInputRefInicio = useRef();

  const [tarea, setTarea] = useState({});

  const {
    errorModalVisible, infoModalVisible, successModalVisible, questionModalVisible,
    showErrorAlert, showInfoAlert, showSuccessAlert, showQuestionAlert,
    closeErrorAlert, closeInfoAlert, closeSuccessAlert, closeQuestionAlert,
  } = useModalFunctions();

  const [modalEditarTarea, setModalEditarTarea] = useState(false);


  let baseURL;
  const URL = `${baseURL}/api/tasks`;


  if (Platform.OS === 'web') {
    baseURL = 'http://localhost:3000';
  } else {
    baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://tu_direccion_de_servidor:3000';
  }

  useEffect(() => {
    if (props.idTarea) {
      axios.get(`${URL}/${props.idTarea}`)
        .then((response) => {
          const tareaData = response.data;
          setTarea(tareaData);
          setTitulo(tareaData.titulo);
          setFechaInicio(tareaData.fecha);
          setDescripcion(tareaData.descripcion);
        })
        .catch((error) => {
          console.error('Error al cargar los datos de la tarea:', error);
        });
    }
  }, [props.idTarea]);

  const guardarTarea = () => {
    const tareaActualizada = {
      titulo,
      fecha: fechaInicio, 
      descripcion,
    };
    showInfoAlert();
    axios
      .put(`${URL}/${props.idTarea}`, tareaActualizada)
      .then((response) => {
        if (response.status === 200) {
          console.log('Tarea actualizada con éxito:', response.data);
          showSuccessAlert();
          setTarea({});
          setTitulo('');
          setFechaInicio('');
          setDescripcion('');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar la tarea:', error);
        showErrorAlert();
      });
  };

  const openDatePickerInicio = () => {
    setModalVisibleInicio(true);
  };

  const clearDateInicio = () => {
    setDateInicio('');
    dateTextInputRefInicio.current.clear();
  };

  const mostrarMEditarTarea = () => {
    setModalEditarTarea(!modalEditarTarea);
  };

  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
      }}
      onPress={mostrarMEditarTarea}
    >
      <FontAwesomeIcon // Cambiado el nombre
        name="edit"
        size={20}
        style={{ marginRight: 10 }}
        color="black"
      />
      <Text>Modificar Tarea</Text>
      <Modal
        isVisible={modalEditarTarea}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        onBackdropPress={mostrarMEditarTarea}
        style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
      >
        <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
          <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Editar Proyecto</Text>
          <View style={styles.opcionesInput}>
            <Text style={styles.textInput}>Titulo</Text>
            <TextInput
              placeholder="Ingrese el título"
              onChangeText={(text) => {
                setTitulo(text);
              }}
              value={titulo}
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
              value={descripcion}
            />
          </View>
          <Button title="Guardar" onPress={guardarTarea} />
        </View>
      </Modal>
      <CustomAlertModal
                isVisible={errorModalVisible}
                type="error"
                message="Ocurrió un error."
                onClose={closeErrorAlert}
            />

            <CustomAlertModal
                isVisible={infoModalVisible}
                type="info"
                message="Se editara el siguiente proyecto"
                onClose={closeInfoAlert}
            />

            <CustomAlertModal
                isVisible={successModalVisible}
                type="success"
                message="Operación exitosa."
                onClose={closeSuccessAlert}
            />
    </TouchableOpacity>
  );
}

export default EditarTarea;
