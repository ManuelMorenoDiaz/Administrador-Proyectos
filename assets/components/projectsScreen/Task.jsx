import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button } from "react-native";
import styles from "../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Platform } from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-modern-datepicker';
import { useModalFunctions } from '../Functions-Alerts';
import CustomAlertModal from '../Alerts';


const Tarea = (props) => {
    const [modalEditarTarea, setModalEditarTarea] = useState(false);
    const [titulo, setTitulo] = useState(props.task.titulo || '');
    const [fechaInicio, setFechaInicio] = useState(props.task.fecha || '');
    const [estatus, setEstatus] = useState(props.task.estatus || '');
    const [descripcion, setDescripcion] = useState(props.task.descripcion || '');

    const [dateInicio, setDateInicio] = useState('');
    const dateTextInputRefInicio = useRef();
    const [modalVisibleInicio, setModalVisibleInicio] = useState(false);

    const {
        errorModalVisible, infoModalVisible, successModalVisible, questionModalVisible,
        showErrorAlert, showInfoAlert, showSuccessAlert, showQuestionAlert,
        closeErrorAlert, closeInfoAlert, closeSuccessAlert, closeQuestionAlert,
    } = useModalFunctions();

    const mostrarMEditarTarea = () => {
        setModalEditarTarea(!modalEditarTarea);
    };

    const openDatePickerInicio = () => {
        setModalVisibleInicio(true);
    };

    const clearDateInicio = () => {
        setDateInicio('');
        dateTextInputRefInicio.current.clear();
    };

    const editarTarea = (idTask) => {
        const tarea = {
            proyecto_id: props.task.proyecto_id,
            titulo,
            fecha: fechaInicio,
            descripcion,
            estatus,
        };

        let baseURL;

        if (Platform.OS === 'web') {
          baseURL = 'http://localhost:3000';
        } else {
          baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://tu_direccion_de_servidor:3000';
        }
        const URLTask = `${baseURL}/api/dependent_tasks`;
    
        showInfoAlert();
        axios
            .put(`${URLTask}/${idTask}`, tarea)
            .then((response) => {
                if (response.status === 200) {
                    console.log('tarea actualizada con éxito:', response.data);
                    // Llamar a tu función de éxito aquí
                    showSuccessAlert();
                }
            })
            .catch((error) => {
                console.error('Error al actualizar el proyecto:', error);
                // Llamar a tu función de error aquí
                showErrorAlert();
            });
    };

    const eliminarTarea = (taskId) => {
        showQuestionAlert();
        axios.delete(`${URLTask}/${taskId}`)
            .then(response => {
                if (response.status === 200) {
                    // Llamar a tu función de éxito aquí
                    showSuccessAlert();
                }
            })
            .catch(error => {
                console.error('Error al eliminar la tarea:', error);
                // Llamar a tu función de error aquí
                showErrorAlert();
            });
    };

    return (
        <View style={styles.tarea}>
            <View style={styles.tareaLeft}>
                <Text style={styles.h4}>
                    {props.task.titulo}
                </Text>
                <Text>Oscar Alfredo Diaz</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => eliminarTarea(props.task._id)}>
                    <Icon
                        name="trash"
                        size={20}
                        style={{ marginRight: 10 }}
                        color="red"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={mostrarMEditarTarea}>
                    <Icon
                        name="edit"
                        size={20}
                        style={{ marginRight: 10 }}
                        color="blue"
                    />
                </TouchableOpacity>
                <Modal
                    isVisible={modalEditarTarea}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    backdropOpacity={0.5}
                    onBackdropPress={mostrarMEditarTarea}
                    style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
                >
                    <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
                        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Editar Tarea</Text>
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
                            <Text style={styles.textInput}>Estado</Text>
                            <TextInput
                                placeholder="Ingrese el estado"
                                onChangeText={(text) => {
                                    setEstatus(text);
                                }}
                                value={estatus}
                                style={styles.input}
                            />
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
                            <Button title="Guardar" onPress={() => editarTarea(props.task._id)} />
                        </View>
                    </View>
                </Modal>
            </View>
                   <CustomAlertModal
                        isVisible={errorModalVisible}
                        type="error"
                        message="Ocurrió un error."
                        onClose={closeErrorAlert}
                    />

                    <CustomAlertModal
                        isVisible={infoModalVisible}
                        type="info"
                        message="La tarea sera editada"
                        onClose={closeInfoAlert}
                    />

                    <CustomAlertModal
                        isVisible={successModalVisible}
                        type="success"
                        message="Operación exitosa."
                        onClose={closeSuccessAlert}
                    />

                    <CustomAlertModal
                        isVisible={questionModalVisible}
                        type="question"
                        message="¿Estás seguro?"
                        onClose={closeQuestionAlert}
                    />
        </View>
    );
}

export default Tarea;

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
