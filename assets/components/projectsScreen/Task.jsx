import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import styles from "../../styles/stylesScreenProjects";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";


const Tarea = () => {
    const [modalEditarTarea, setModalEditarTarea] = useState(false);
    const mostrarMEditarTarea = () => {
        setModalEditarTarea(!modalEditarTarea);
    };

    return (
        <View style={styles.tarea}>
            <View style={styles.tareaLeft}>
                <Text style={styles.h4}>
                    Validación del diseño de la app
                </Text>
                <Text>Oscar Alfredo Diaz</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Icon
                        name="delete"
                        size={20}
                        style={{ marginRight: 10 }}
                        color="black"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={mostrarMEditarTarea}>
                    <Icon
                        name="edit"
                        size={20}
                        style={{ marginRight: 10 }}
                        color="black"
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
                <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding:10 }}>
                
                        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Editar Tarea</Text>
                        <View style={styles.opcionesInput}>
                            <Text style={styles.textInput}>Titulo</Text>
                            <TextInput
                                placeholder="Ingrese el título"
                                onChangeText={(text) => {
                                    // Manejar el texto ingresado en el campo de título
                                }}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.opcionesInput}>
                            <Text style={styles.textInput}>Fecha Finalización</Text>
                            <TextInput
                                placeholder="Ingrese el título"
                                onChangeText={(text) => {
                                    // Manejar el texto ingresado en el campo de título
                                }}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.opcionesInput}>
                            <Text style={styles.textInput}>Estado</Text>
                            
                        </View>
                        <View style={styles.opcionesInput}>
                            <Text style={styles.textInput}>Responsable</Text>
                            <TextInput
                                placeholder="Ingrese el título"
                                onChangeText={(text) => {
                                    // Manejar el texto ingresado en el campo de título
                                }}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.opcionesInput}>
                            <Text style={styles.textInput}>Descripción</Text>
                            <TextInput
                                placeholder="Ingrese la descripción"
                                onChangeText={(text) => {
                                    // Manejar el texto ingresado en el campo de descripción
                                }}
                                style={styles.input}
                            />
                            <Button title="Guardar" />

                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

export default Tarea;