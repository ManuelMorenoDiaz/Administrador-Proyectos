import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet } from "react-native";
import styles from "../../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import CustomAlertModal from '../../Alerts';
import { useModalFunctions } from '../../Functions-Alerts';
import DatePicker from 'react-native-modern-datepicker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Platform } from 'react-native';


const EditarProyecto = (props) => {

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

    const [proyecto, setProyecto] = useState({}); // Estado para almacenar los datos del proyecto

    const {
        errorModalVisible, infoModalVisible, successModalVisible, questionModalVisible,
        showErrorAlert, showInfoAlert, showSuccessAlert, showQuestionAlert,
        closeErrorAlert, closeInfoAlert, closeSuccessAlert, closeQuestionAlert,
    } = useModalFunctions();

    let baseURL;

    if (Platform.OS === 'web') {
        baseURL = 'http://localhost:3000';
    } else {
        baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://tu_direccion_de_servidor:3000';
    }
    const URL = `${baseURL}/api/projects`;

    useEffect(() => {
        // Cargar los datos del proyecto cuando se monta el componente
        if (props.idProyecto) {
            axios.get(`${URL}/${props.idProyecto}`)
                .then((response) => {
                    const proyectoData = response.data;
                    setProyecto(proyectoData);
                    setTitulo(proyectoData.titulo);
                    setFechaInicio(proyectoData.fecha_inicio);
                    setFechaFinalizacion(proyectoData.fecha_fin);
                    setDescripcion(proyectoData.descripcion);
                })
                .catch((error) => {
                    console.error('Error al cargar los datos del proyecto:', error);
                });
        }
    }, [props.idProyecto]);
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
        const proyectoActualizado = {
            titulo,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFinalizacion,
            descripcion,
        };

        showInfoAlert();
        // Realizar la solicitud PUT a la API para actualizar el proyecto
        axios
            .put(`${URL}/${props.idProyecto}`, proyectoActualizado)
            .then((response) => {
                if (response.status === 200) {
                    // Proyecto actualizado con éxito
                    console.log('Proyecto actualizado con éxito:', response.data);
                    showSuccessAlert();

                    // Reiniciar el estado del proyecto
                    setProyecto({});
                    setTitulo('');
                    setFechaInicio('');
                    setFechaFinalizacion('');
                    setDescripcion('');
                }
            })
            .catch((error) => {
                // Manejo de errores en caso de que la actualización falle
                console.error('Error al actualizar el proyecto:', error);
                showErrorAlert();
            });
    };
    const [modalEditarProyecto, setModalEditarProyecto] = useState(false);
    const mostrarMEditarProyecto = () => {
        setModalEditarProyecto(!modalEditarProyecto);
    };

    return (
        <TouchableOpacity
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
            }}
            onPress={mostrarMEditarProyecto}
        >
            <Icon
                name="edit"
                size={20}
                style={{ marginRight: 10 }}
                color="black"
            />
            <Text>Editar Proyecto--{props.idProyecto}</Text>
            <Modal
                isVisible={modalEditarProyecto}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={mostrarMEditarProyecto}
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
                            value={descripcion}
                        />
                        <Button title="Guardar" onPress={guardarProyecto} />
                    </View>
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

export default EditarProyecto;


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
